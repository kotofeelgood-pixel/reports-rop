<script setup lang="ts">
import { useNotify } from '@/composables/useNotify'
import type { NotifyType } from '@/composables/useNotify'

const { toasts, remove } = useNotify()

const typeClasses: Record<NotifyType, string> = {
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
  success: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
  warning: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
  error: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
}
</script>

<template>
  <div
    class="pointer-events-none fixed top-4 right-4 z-[99999] flex max-w-sm flex-col gap-3"
    aria-live="polite"
  >
    <TransitionGroup name="notify">
      <div
        v-for="toast of toasts"
        :key="toast.id"
        class="pointer-events-auto relative flex flex-col overflow-hidden rounded-lg border shadow-lg"
        :class="typeClasses[toast.type ?? 'info']"
      >
        <div class="px-4 py-3 pr-10">
          <p class="font-medium text-gray-900 dark:text-white">{{ toast.title }}</p>
          <p v-if="toast.description" class="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
            {{ toast.description }}
          </p>
          <div
            v-if="toast.progress !== undefined"
            class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <div
              class="h-full rounded-full bg-blue-500 transition-[width] duration-300"
              :style="{ width: `${Math.min(100, Math.max(0, toast.progress))}%` }"
            />
          </div>
        </div>
        <button
          type="button"
          class="absolute right-2 top-2 rounded p-1 text-gray-500 hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/10"
          aria-label="Закрыть"
          @click="remove(toast.id)"
        >
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notify-enter-active,
.notify-leave-active {
  transition: all 0.3s ease;
}
.notify-enter-from,
.notify-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
