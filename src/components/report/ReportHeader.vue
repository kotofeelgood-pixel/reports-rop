<script setup lang="ts">
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

const emit = defineEmits<{
  openSettings: []
}>()
</script>

<template>
  <header class="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-[#252525]">
    <div class="flex items-center gap-3">
      <h1 class="text-lg font-bold text-gray-900 dark:text-white">Отчет по звонкам</h1>
    </div>
    <ButtonComponent
      variant="ghost"
      size="icon"
      class="settings-button rounded-lg"
      aria-label="Настройки"
      @click="emit('openSettings')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="size-7" viewBox="0 0 24 24">
        <path fill="currentColor" d="m12 1l9.5 5.5v11L12 23l-9.5-5.5v-11zm0 14a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
      </svg>
    </ButtonComponent>
  </header>
</template>

