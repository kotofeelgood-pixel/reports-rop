<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

const route = useRoute()
const emit = defineEmits<{
  openSettings: []
}>()

const isReport = () => route.name === 'home'
const isAnalytics = () => route.name === 'analytics'
</script>

<template>
  <header class="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#252525]">
    <div class="flex items-center gap-3">
      <h1 class="text-lg font-bold text-gray-900 dark:text-white">Отчет по звонкам</h1>
      <nav class="flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <RouterLink
          :to="{ name: 'home' }"
          class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          :class="isReport() ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        >
          Отчет
        </RouterLink>
        <RouterLink
          :to="{ name: 'analytics' }"
          class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          :class="isAnalytics() ? 'bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
        >
          Аналитика
        </RouterLink>
      </nav>
    </div>
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
  </header>
</template>

