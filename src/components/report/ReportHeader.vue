<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

const route = useRoute()
const emit = defineEmits<{
  openSettings: []
}>()

const isReport = () => route.name === 'home'
const isAnalytics = () => route.name === 'analytics'
const isDocumentation = () => route.name === 'documentation'
</script>

<template>
  <header class="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#252525]">
    <div class="flex items-center gap-3">
      <nav class="flex gap-0.5 rounded-md bg-gray-100 p-0.5 dark:bg-gray-800">
        <RouterLink
          :to="{ name: 'home' }"
          class="rounded px-2 py-1 text-xs font-medium transition-colors"
          :class="isReport() ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        >
          Отчет
        </RouterLink>
        <RouterLink
          :to="{ name: 'analytics' }"
          class="rounded px-2 py-1 text-xs font-medium transition-colors"
          :class="isAnalytics() ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        >
          Аналитика
        </RouterLink>
        <RouterLink
          :to="{ name: 'documentation' }"
          class="rounded px-2 py-1 text-xs font-medium transition-colors"
          :class="isDocumentation() ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        >
          Документация
        </RouterLink>
      </nav>
      <h1 class="text-lg font-bold text-gray-900 dark:text-white">Отчет по звонкам</h1>
    </div>
    <div class="flex items-center gap-2">
      <ButtonComponent
        variant="ghost"
        size="icon"
        class="rounded-lg border-none"
        aria-label="Настройки"
        @click="emit('openSettings')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-7" viewBox="0 0 24 24">
          <path fill="currentColor" d="m12 1l9.5 5.5v11L12 23l-9.5-5.5v-11zm0 14a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
        </svg>
      </ButtonComponent>
    </div>
  </header>
</template>

