<script setup lang="ts">
import type { Call } from '@/tools/calls'

type Props = {
  currentPlayingCall: Call | null
  title: string
  isPlaying: boolean
  hasPrev: boolean
  hasNext: boolean
  playbackRate: number
  playbackRates: readonly number[]
  autoAdvance: boolean
  audioError: string | null
  audioCurrentTime: number
  audioDuration: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'play-prev'): void
  (e: 'play-next'): void
  (e: 'toggle-play-pause'): void
  (e: 'set-playback-rate', rate: number): void
  (e: 'toggle-auto-advance'): void
  (e: 'seek', event: Event): void
  (e: 'close'): void
}>()

const formatTime = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  if (h > 0) return `${h}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  return `${m}:${String(s % 60).padStart(2, '0')}`
}
</script>

<template>
  <div
    class="audio-player-fixed fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-2xl dark:border-gray-700 dark:bg-[#2a2a2a]"
    style="z-index: 999999 !important; position: fixed !important;"
  >
    <div class="flex w-full items-center gap-4 px-6 py-4">
      <!-- Информация о звонке -->
      <div class="flex w-48 shrink-0 items-center gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 dark:bg-gray-700">
          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
            />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <div class="truncate text-sm font-medium text-gray-900 dark:text-white">
            {{ title }}
          </div>
          <div class="truncate text-xs text-gray-500 dark:text-gray-400">
            {{ currentPlayingCall?.number }}
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
          @click="emit('play-prev')"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 dark:bg:white dark:text-gray-900 dark:hover:bg-gray-200 disabled:opacity-50"
          :disabled="!currentPlayingCall?.recordingUrl || !!audioError"
          aria-label="Воспроизвести / пауза"
          @click="emit('toggle-play-pause')"
        >
          <svg v-if="!isPlaying" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button
          type="button"
          class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          :disabled="!hasNext"
          aria-label="Следующая запись"
          @click="emit('play-next')"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z"
            />
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
          :class="
            playbackRate === rate
              ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-200 dark:hover:bg-gray-700'
          "
          @click="emit('set-playback-rate', rate)"
        >
          x{{ rate }}
        </button>
      </div>

      <!-- Автопереход -->
      <button
        type="button"
        class="shrink-0 rounded-md border px-2 py-1 text-xs font-medium transition-colors"
        :class="
          autoAdvance
            ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900'
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-[#2a2a2a] dark:text-gray-200 dark:hover:bg-gray-700'
        "
        @click="emit('toggle-auto-advance')"
      >
        Авто: {{ autoAdvance ? 'вкл' : 'выкл' }}
      </button>

      <!-- Прогресс и время -->
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <div v-if="audioError" class="text-xs text-red-600 dark:text-red-400">
          {{ audioError }}
        </div>
        <div class="flex items-center gap-3">
          <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">
            {{ formatTime(audioCurrentTime) }}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            :value="audioDuration > 0 ? (audioCurrentTime / audioDuration) * 100 : 0"
            class="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-gray-300 accent-gray-900 dark:bg-gray-600 dark:accent-white"
            @input="(event) => emit('seek', event)"
          />
          <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">
            {{ formatTime(audioDuration) || currentPlayingCall?.duration }}
          </span>
        </div>
      </div>

      <!-- Кнопка закрыть -->
      <button
        type="button"
        class="shrink-0 rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        aria-label="Закрыть плеер"
        @click.stop="emit('close')"
      >
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

