<script setup lang="ts">
import { computed, watch, ref, h } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import type { Call } from '@/tools/calls'
import { getCrmEntityUrl, openInB24 } from '@/tools'
import { formatDateRangeFromDates } from '@/tools/date'
import UserCallsPlayer from './UserCallsPlayer.vue'
import DownloadIcon from '@bitrix24/b24icons-vue/outline/DownloadIcon'
import PlayIcon from '@bitrix24/b24icons-vue/common-service/PlayIcon'
import PauseIcon from '@bitrix24/b24icons-vue/solid/PauseIcon'
import 'simplebar'
import 'simplebar/dist/simplebar.css'

type Props = {
  userName: string
  callType: string
  calls: Call[]
  /** Карта имён CRM (ключ "ENTITYTYPE_ID"), подгружаемых из Битрикс при открытии модалки. Может быть Ref. */
  crmNames?: Map<string, string> | { value: Map<string, string> }
  /** Диапазон дат для отображения периода звонков */
  dateRange?: { start: Date; end: Date } | null
}

const props = defineProps<Props>()

function getCrmDisplayName(call: Call): string {
  if (!call.crmEntityType || !call.crmEntityId) return call.crm
  const map = props.crmNames && 'value' in props.crmNames ? props.crmNames.value : props.crmNames
  if (!map || typeof map.get !== 'function') return call.crm
  const type = String(call.crmEntityType).toUpperCase()
  const key = `${type}_${call.crmEntityId}`
  const name = map.get(key)
  if (name) return name
  return call.crm
}

function getCrmEntityLink(call: Call): string | null {
  if (!call.crmEntityType || !call.crmEntityId) return null
  return getCrmEntityUrl(call.crmEntityType, call.crmEntityId)
}
const model = defineModel<boolean>('open', { default: false })

const dateRangeDisplay = computed(() => {
  if (!props.dateRange) return ''
  return formatDateRangeFromDates(props.dateRange.start, props.dateRange.end)
})

const modalTitle = computed(() => `${props.userName} — ${props.callType}`)

const currentPlayingCall = ref<Call | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const audioCurrentTime = ref(0)
const audioDuration = ref(0)
const audioError = ref<string | null>(null)
const playbackRate = ref(1)
const playbackRates = [1, 1.25, 1.5, 2] as const
const autoAdvance = ref(false)
let rafId: number | null = null
const PROGRESS_UPDATE_INTERVAL_MS = 100
let lastProgressUpdate = 0

const modalBodyClass = computed(() => ({
  body: currentPlayingCall.value ? 'pb-40' : '',
}))

const playableCalls = computed(() =>
  (props.calls || []).filter(
    (c) => c.hasRecording && Boolean(c.recordingUrl && c.recordingUrl.trim()),
  ),
)

const currentPlayableIndex = computed(() => {
  const id = currentPlayingCall.value?.id
  if (!id) return -1
  return playableCalls.value.findIndex((c) => c.id === id)
})

const hasPrev = computed(() => currentPlayableIndex.value > 0)
const hasNext = computed(
  () =>
    currentPlayableIndex.value >= 0 && currentPlayableIndex.value < playableCalls.value.length - 1,
)

watch(model, (newVal) => {
  if (!newVal) {
    currentPlayingCall.value = null
    audioError.value = null
    if (audioRef.value) {
      audioRef.value.pause()
      audioRef.value.removeAttribute('src')
      audioRef.value.load()
    }
  }
})

const onAudioLoadedMetadata = () => {
  const audio = audioRef.value
  if (!audio) return
  audio.playbackRate = playbackRate.value
  audioDuration.value = Number.isFinite(audio.duration) ? audio.duration : 0
}

const onAudioTimeUpdate = () => {
  const audio = audioRef.value
  if (!audio) return
  audioCurrentTime.value = audio.currentTime
}

const startRafSync = () => {
  if (rafId != null) return
  lastProgressUpdate = 0
  const tick = (now: number) => {
    const audio = audioRef.value
    if (audio) {
      if (audioDuration.value === 0 && Number.isFinite(audio.duration)) {
        audioDuration.value = audio.duration
      }
      if (now - lastProgressUpdate >= PROGRESS_UPDATE_INTERVAL_MS) {
        lastProgressUpdate = now
        audioCurrentTime.value = audio.currentTime
      }
    }
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
}

const stopRafSync = () => {
  if (rafId == null) return
  cancelAnimationFrame(rafId)
  rafId = null
}

const onAudioPlay = () => {
  isPlaying.value = true
  startRafSync()
}

const onAudioPause = () => {
  isPlaying.value = false
  stopRafSync()
}

const onAudioEnded = () => {
  if (autoAdvance.value && hasNext.value) {
    const nextCall = playableCalls.value[currentPlayableIndex.value + 1]
    if (nextCall) {
      startPlayback(nextCall)
      return
    }
  }
  onAudioPause()
}

const onAudioError = () => {
  audioError.value = 'Не удалось загрузить запись'
  isPlaying.value = false
  stopRafSync()
}

const startPlayback = (call: Call) => {
  if (!call.hasRecording || !call.recordingUrl) return
  currentPlayingCall.value = call
  audioError.value = null
  audioCurrentTime.value = 0
  audioDuration.value = 0

  const audio = audioRef.value
  if (!audio) {
    audioError.value = 'Аудиоплеер не инициализирован'
    return
  }

  // Важно: play() вызываем прямо в обработчике клика, иначе браузер блокирует autoplay.
  if (audio.src !== call.recordingUrl) {
    audio.src = call.recordingUrl
  }
  audio.playbackRate = playbackRate.value
  audio.currentTime = 0
  audio.play().catch((e) => {
    audioError.value = e?.message ?? 'Не удалось воспроизвести'
    isPlaying.value = false
  })
}

const setPlaybackRate = (rate: number) => {
  playbackRate.value = rate
  if (audioRef.value) {
    audioRef.value.playbackRate = rate
  }
}

const playRecording = (call: Call) => {
  startPlayback(call)
}

/** Скачивание записи звонка по URL с осмысленным именем файла */
const downloadRecording = (call: Call) => {
  if (!call.hasRecording || !call.recordingUrl) return
  const xhr = new XMLHttpRequest()
  xhr.open('GET', call.recordingUrl, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) return
    const blob = xhr.response as Blob
    const baseUrl = call.recordingUrl!.split(/[#?]/)[0] ?? ''
    const ext = baseUrl.match(/\.(mp3|wav|ogg|m4a|webm|opus)$/i)?.[1]?.toLowerCase() ?? 'mp3'
    const safeTime = call.time
      .replace(/[^\d-]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 8)
    const safeNumber = (call.number || 'unknown').replace(/\D/g, '').slice(-10) || 'call'
    const filename = `zapis_${safeTime}_${safeNumber}.${ext}`
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  xhr.onerror = () => {}
  xhr.send()
}

const closePlayer = () => {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.removeAttribute('src')
    audioRef.value.load()
  }
  currentPlayingCall.value = null
  isPlaying.value = false
  audioCurrentTime.value = 0
  audioDuration.value = 0
  audioError.value = null
  stopRafSync()
}

const togglePlayPause = () => {
  const audio = audioRef.value
  if (!audio) return
  if (isPlaying.value) audio.pause()
  else audio.play().catch(() => {})
}

const playPrev = () => {
  if (!hasPrev.value) return
  const prevCall = playableCalls.value[currentPlayableIndex.value - 1]
  if (prevCall) startPlayback(prevCall)
}

const playNext = () => {
  if (!hasNext.value) return
  const nextCall = playableCalls.value[currentPlayableIndex.value + 1]
  if (nextCall) startPlayback(nextCall)
}

/** Эта строка — текущий трек в плеере (идёт или на паузе) */
const isCurrentTrack = (call: Call) =>
  currentPlayingCall.value != null && String(currentPlayingCall.value.id) === String(call.id)

const recordingStatus = (call: Call): string => {
  if (!call.hasRecording) return '—'
  if (!isCurrentTrack(call)) return 'Прослушать'
  return isPlaying.value ? 'Проигрывается' : 'На паузе'
}

const data = computed<Call[]>(() => (props.calls || []) as Call[])

const columns: TableColumn<Call>[] = [
  {
    accessorKey: 'date',
    header: 'ДАТА',
  },
  {
    accessorKey: 'time',
    header: 'ВРЕМЯ',
  },
  {
    accessorKey: 'number',
    header: 'НОМЕР',
  },
  {
    accessorKey: 'type',
    header: 'ТИП',
  },
  {
    accessorKey: 'duration',
    header: 'ДЛИТ.',
  },
  {
    id: 'crm',
    header: 'CRM',
    cell: ({ row }) => {
      const call = row.original as Call
      const title = getCrmDisplayName(call)
      const link = getCrmEntityLink(call)

      if (link) {
        return h(
          'button',
          {
            type: 'button',
            class:
              'text-[#2563eb] hover:underline bg-transparent border-0 cursor-pointer p-0 font-inherit dark:text-blue-400',
            onClick: () => openInB24(link),
          },
          title,
        )
      }

      return h('span', { class: 'text-gray-600 dark:text-gray-400' }, title)
    },
  },
  {
    id: 'recording',
    header: 'Запись',
    cell: ({ row }) => {
      const call = row.original as Call
      const status = recordingStatus(call)

      if (status === 'Проигрывается') {
        return h('span', { class: 'inline-flex items-center gap-2' }, [
          h(
            'button',
            {
              type: 'button',
              class:
                'text-green-600 dark:text-green-400 bg-transparent border-0 cursor-pointer p-0',
              onClick: () => togglePlayPause(),
            },
            [h(PauseIcon, { class: 'w-5 h-5' })],
          ),
          h('span', { class: 'text-gray-300 dark:text-gray-600' }, '|'),
          h(
            'button',
            {
              type: 'button',
              class:
                'text-[#2563eb] bg-transparent border-0 cursor-pointer p-0 font-inherit dark:text-blue-400',
              onClick: () => downloadRecording(call),
            },
            [h(DownloadIcon, { class: 'w-5 h-5' })],
          ),
        ])
      }

      if (status === 'На паузе') {
        return h('span', { class: 'inline-flex items-center gap-2' }, [
          h(
            'button',
            {
              type: 'button',
              class:
                'text-[#2563eb] bg-transparent border-0 cursor-pointer p-0 font-inherit dark:text-blue-400',
              onClick: () => togglePlayPause(),
            },
            [h(PlayIcon, { class: 'w-5 h-5' })],
          ),
          h('span', { class: 'text-gray-300 dark:text-gray-600' }, '|'),
          h(
            'button',
            {
              type: 'button',
              class:
                'text-[#2563eb] bg-transparent border-0 cursor-pointer p-0 font-inherit dark:text-blue-400',
              onClick: () => downloadRecording(call),
            },
            [h(DownloadIcon, { class: 'w-5 h-5' })],
          ),
        ])
      }

      if (call.hasRecording) {
        return h('span', { class: 'inline-flex items-center gap-2' }, [
          h(
            'button',
            {
              type: 'button',
              class:
                'text-[#2563eb] bg-transparent border-0 cursor-pointer p-0 font-inherit dark:text-blue-400',
              onClick: () => playRecording(call),
            },
            [h(PlayIcon, { class: 'w-5 h-5' })],
          ),
          h('span', { class: 'text-gray-300 dark:text-gray-600' }, '|'),
          h(
            'button',
            {
              type: 'button',
              class:
                'text-[#2563eb] bg-transparent border-0 cursor-pointer p-0 font-inherit dark:text-blue-400',
              onClick: () => downloadRecording(call),
            },
            [h(DownloadIcon, { class: 'w-5 h-5' })],
          ),
        ])
      }

      return h('span', { class: 'text-gray-400' }, '—')
    },
  },
]

const onSeek = (e: Event) => {
  const audio = audioRef.value
  const input = e.target as HTMLInputElement
  if (!audio || !audioDuration.value) return
  const pct = Number(input.value) / 100
  audio.currentTime = pct * audioDuration.value
  audioCurrentTime.value = audio.currentTime
}

const toggleAutoAdvance = () => {
  autoAdvance.value = !autoAdvance.value
}
</script>

<template>
  <Teleport to="body">
    <ModalComponent
      v-model:open="model"
      :title="modalTitle"
      fullscreen
      overlay
      modal
      :close="true"
      :b24ui="modalBodyClass"
    >
      <template #body>
        <div class="space-y-4">
          <!-- Кнопка назад и дата -->
          <div class="flex items-center justify-between">
            <ButtonComponent
              variant="ghost"
              size="md"
              class="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              @click="model = false"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Назад
            </ButtonComponent>
            <div
              v-if="dateRangeDisplay"
              class="text-sm font-medium text-gray-600 dark:text-gray-400"
            >
              Период: {{ dateRangeDisplay }}
            </div>
          </div>
          <!-- Таблица звонков -->
          <div class="flex min-w-0 flex-1 flex-col">
            <div data-simplebar class="max-h-[60vh]">
              <B24Table :data="data" :columns="columns" class="min-w-full" />
            </div>
          </div>
        </div>
      </template>

      <!-- Скрытый аудио-элемент для воспроизведения записи -->
      <audio
        ref="audioRef"
        class="pointer-events-none absolute h-px w-px opacity-0"
        preload="metadata"
        @play="onAudioPlay"
        @pause="onAudioPause"
        @ended="onAudioEnded"
        @timeupdate="onAudioTimeUpdate"
        @loadedmetadata="onAudioLoadedMetadata"
        @error="onAudioError"
      />

      <!-- Аудио-плеер внутри модалки -->
      <template #footer>
        <UserCallsPlayer
          v-if="currentPlayingCall"
          :current-playing-call="currentPlayingCall"
          :title="getCrmDisplayName(currentPlayingCall)"
          :is-playing="isPlaying"
          :has-prev="hasPrev"
          :has-next="hasNext"
          :playback-rate="playbackRate"
          :playback-rates="playbackRates"
          :auto-advance="autoAdvance"
          :audio-error="audioError"
          :audio-current-time="audioCurrentTime"
          :audio-duration="audioDuration"
          @play-prev="playPrev"
          @play-next="playNext"
          @toggle-play-pause="togglePlayPause"
          @set-playback-rate="setPlaybackRate"
          @toggle-auto-advance="toggleAutoAdvance"
          @seek="onSeek"
          @close="closePlayer"
        />
      </template>
    </ModalComponent>
  </Teleport>
</template>

<style scoped>
/* Гарантируем, что плеер всегда поверх модалки */
:deep([style*='z-index: 999999']) {
  z-index: 999999 !important;
}
</style>
