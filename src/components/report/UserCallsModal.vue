<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import * as XLSX from 'xlsx'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import AttachTranscriptionModal from '@/components/report/AttachTranscriptionModal.vue'
import TranscriptionViewModal from '@/components/report/TranscriptionViewModal.vue'
import type { Call } from '@/tools/calls'

type Props = {
  userName: string
  callType: string
  calls: Call[]
  /** Карта имён CRM (ключ "ENTITYTYPE_ID"), подгружаемых из Битрикс при открытии модалки. Может быть Ref. */
  crmNames?: Map<string, string> | { value: Map<string, string> }
}

const props = defineProps<Props>()

function getCrmDisplayName(call: Call): string {
  if (!call.crmEntityType || !call.crmEntityId) return call.crm
  const map = props.crmNames && 'value' in props.crmNames ? props.crmNames.value : props.crmNames
  if (!map || typeof map.get !== 'function') return call.crm
  const type = String(call.crmEntityType).toUpperCase()
  const key = `${type}_${call.crmEntityId}`
  return map.get(key) ?? call.crm
}
const model = defineModel<boolean>('open', { default: false })

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
const transcriptionModalOpen = ref(false)
const transcriptionCall = ref<Call | null>(null)
const transcriptionViewModalOpen = ref(false)
const transcriptionViewCall = ref<Call | null>(null)
let rafId: number | null = null
const PROGRESS_UPDATE_INTERVAL_MS = 100
let lastProgressUpdate = 0

const modalBodyClass = computed(() => ({
  body: currentPlayingCall.value ? 'pb-40' : ''
}))

const playableCalls = computed(() =>
  (props.calls || []).filter(c => c.hasRecording && Boolean(c.recordingUrl && c.recordingUrl.trim()))
)

const currentPlayableIndex = computed(() => {
  const id = currentPlayingCall.value?.id
  if (!id) return -1
  return playableCalls.value.findIndex(c => c.id === id)
})

const hasPrev = computed(() => currentPlayableIndex.value > 0)
const hasNext = computed(() => currentPlayableIndex.value >= 0 && currentPlayableIndex.value < playableCalls.value.length - 1)

function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

const progressPercent = computed(() =>
  audioDuration.value > 0 ? (audioCurrentTime.value / audioDuration.value) * 100 : 0
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
    const ext =
      (baseUrl.match(/\.(mp3|wav|ogg|m4a|webm|opus)$/i)?.[1]?.toLowerCase()) ?? 'mp3'
    const safeTime = call.time.replace(/[^\d-]/g, '-').replace(/-+/g, '-').slice(0, 8)
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

const onSeek = (e: Event) => {
  const audio = audioRef.value
  const input = e.target as HTMLInputElement
  if (!audio || !audioDuration.value) return
  const pct = Number(input.value) / 100
  audio.currentTime = pct * audioDuration.value
  audioCurrentTime.value = audio.currentTime
}

const openTranscriptionModal = (call: Call) => {
  transcriptionCall.value = call
  transcriptionModalOpen.value = true
}

const openTranscriptionViewModal = (call: Call) => {
  transcriptionViewCall.value = call
  transcriptionViewModalOpen.value = true
}

const onAddTranscriptionFromView = () => {
  if (transcriptionViewCall.value) {
    transcriptionCall.value = transcriptionViewCall.value
    transcriptionViewModalOpen.value = false
    transcriptionModalOpen.value = true
  }
}

const exportToExcel = async () => {
  const list = (props.calls || []) as Call[]
  try {
    const headers = ['ВРЕМЯ', 'НОМЕР', 'ТИП', 'ДЛИТЕЛЬНОСТЬ', 'CRM', 'Запись']
    const rows = list.map((c) => [
      c.time,
      c.number,
      c.type,
      c.duration,
      getCrmDisplayName(c),
      c.hasRecording ? 'Да' : '—',
    ])
    const data = [headers, ...rows]
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Звонки')
    const date = new Date().toISOString().slice(0, 10)
    const fileName = `report-calls-${date}.xlsx`
    XLSX.writeFile(wb, fileName)
  } catch {
    // экспорт без уведомлений
  }
}
</script>

<template>
  <div>
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
        <!-- Таблица звонков -->
        <div>
          <table class="w-full text-left text-base">
            <thead class="bg-[#e0f7fc] text-gray-700 dark:bg-[#1e3a47] dark:text-gray-300">
              <tr>
                <th class="px-4 py-4 font-semibold">ВРЕМЯ</th>
                <th class="px-4 py-4 font-semibold">НОМЕР</th>
                <th class="px-4 py-4 font-semibold">ТИП</th>
                <th class="px-4 py-4 font-semibold">ДЛИТ.</th>
                <th class="px-4 py-4 font-semibold">CRM</th>
                <th class="px-4 py-4 text-center font-semibold">Запись</th>
                <th class="px-4 py-4 text-center font-semibold">Расшифровка</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="call in calls"
                :key="call.id"
                :class="[
                  'border-t border-gray-100 hover:bg-gray-50/80 dark:border-gray-700 dark:hover:bg-gray-800/50',
                  isCurrentTrack(call) ? 'bg-blue-50/60 dark:bg-blue-900/20' : '',
                ]"
              >
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.time }}</td>
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.number }}</td>
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.type }}</td>
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.duration }}</td>
                <td class="px-4 py-4">
                  <span class="text-blue-600 hover:underline dark:text-blue-400">{{ getCrmDisplayName(call) }}</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <span
                    v-if="recordingStatus(call) === 'Проигрывается'"
                    class="inline-flex items-center gap-2"
                  >
                    <span class="font-medium text-green-600 dark:text-green-400">Проигрывается</span>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="openTranscriptionViewModal(call)"
                    >
                      Расшифровать
                    </button>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="downloadRecording(call)"
                    >
                      Скачать
                    </button>
                  </span>
                  <span
                    v-else-if="recordingStatus(call) === 'На паузе'"
                    class="inline-flex items-center gap-2"
                  >
                    <span class="font-medium text-gray-600 dark:text-gray-400">На паузе</span>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="openTranscriptionViewModal(call)"
                    >
                      Расшифровать
                    </button>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="downloadRecording(call)"
                    >
                      Скачать
                    </button>
                  </span>
                  <span v-else-if="call.hasRecording" class="inline-flex items-center gap-2">
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="playRecording(call)"
                    >
                      Прослушать
                    </button>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="openTranscriptionViewModal(call)"
                    >
                      Расшифровать
                    </button>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="downloadRecording(call)"
                    >
                      Скачать
                    </button>
                  </span>
                  <span v-else class="inline-flex items-center gap-2">
                    <span class="text-gray-400">—</span>
                    <span class="text-gray-300 dark:text-gray-600">|</span>
                    <button
                      class="text-blue-600 hover:underline dark:text-blue-400"
                      @click="openTranscriptionViewModal(call)"
                    >
                      Расшифровать
                    </button>
                  </span>
                </td>
                <td class="px-4 py-4 text-center">
                  <button
                    type="button"
                    class="text-blue-600 hover:underline dark:text-blue-400"
                    @click="openTranscriptionModal(call)"
                  >
                    Добавить расшифровку
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Кнопка экспорта -->
        <div class="flex justify-start">
          <ButtonComponent
            color="light-border"
            size="md"
            @click="exportToExcel"
          >
            XLSX
          </ButtonComponent>
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
    <template v-if="currentPlayingCall" #footer>
      <div
        class="audio-player-fixed fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-2xl dark:border-gray-700 dark:bg-[#2a2a2a]"
        style="z-index: 999999 !important; position: fixed !important;"
      >
        <div class="flex w-full items-center gap-4 px-6 py-4">
          <!-- Информация о звонке -->
          <div class="flex w-48 shrink-0 items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 dark:bg-gray-700">
              <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-medium text-gray-900 dark:text-white">
                {{ currentPlayingCall ? getCrmDisplayName(currentPlayingCall) : '' }}
              </div>
              <div class="truncate text-xs text-gray-500 dark:text-gray-400">
                {{ currentPlayingCall.number }}
              </div>
            </div>
          </div>

          <!-- Управление воспроизведением -->
          <div class="flex shrink-0 items-center gap-2">
            <button
              type="button"
              class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              :disabled="!hasPrev"
              aria-label="Предыдущая запись"
              @click="playPrev"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>

            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 disabled:opacity-50"
              :disabled="!currentPlayingCall?.recordingUrl || !!audioError"
              aria-label="Воспроизвести / пауза"
              @click="togglePlayPause"
            >
              <svg v-if="!isPlaying" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>

            <button
              type="button"
              class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              :disabled="!hasNext"
              aria-label="Следующая запись"
              @click="playNext"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
          </div>

          <!-- Скорость воспроизведения -->
          <div class="flex shrink-0 items-center gap-1">
            <button
              v-for="rate in playbackRates"
              :key="rate"
              type="button"
              class="rounded-md border px-2 py-1 text-xs font-medium transition-colors"
              :class="playbackRate === rate
                ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-200 dark:hover:bg-gray-700'"
              @click="setPlaybackRate(rate)"
            >
              x{{ rate }}
            </button>
          </div>

          <!-- Автопереход -->
          <button
            type="button"
            class="shrink-0 rounded-md border px-2 py-1 text-xs font-medium transition-colors"
            :class="autoAdvance
              ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-200 dark:hover:bg-gray-700'"
            @click="autoAdvance = !autoAdvance"
          >
            Авто: {{ autoAdvance ? 'вкл' : 'выкл' }}
          </button>

          <!-- Прогресс и время -->
          <div class="flex min-w-0 flex-1 flex-col gap-1">
            <div v-if="audioError" class="text-xs text-red-600 dark:text-red-400">
              {{ audioError }}
            </div>
            <div class="flex items-center gap-3">
              <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">{{ formatTime(audioCurrentTime) }}</span>
              <input
                type="range"
                min="0"
                max="100"
                :value="progressPercent"
                class="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-gray-300 accent-gray-900 dark:bg-gray-600 dark:accent-white"
                @input="onSeek"
              />
              <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">{{ formatTime(audioDuration) || currentPlayingCall.duration }}</span>
            </div>
          </div>

          <!-- Кнопка закрыть -->
          <button
            type="button"
            class="shrink-0 rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Закрыть плеер"
            @click.stop="closePlayer"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </ModalComponent>

  <!-- Модалки расшифровки рендерятся рядом с основной модалкой, иначе не отображаются (B24Modal не рендерит default slot) -->
  <TranscriptionViewModal
    v-model:open="transcriptionViewModalOpen"
    :call="transcriptionViewCall"
    @add-transcription="onAddTranscriptionFromView"
  />
  <AttachTranscriptionModal
    v-model:open="transcriptionModalOpen"
    :call="transcriptionCall"
  />
  </div>
</template>

<style scoped>
/* Гарантируем, что плеер всегда поверх модалки */
:deep([style*="z-index: 999999"]) {
  z-index: 999999 !important;
}
</style>

