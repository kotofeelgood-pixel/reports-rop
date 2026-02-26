<script setup lang="ts">
import Filter1Icon from '@bitrix24/b24icons-vue/main/Filter1Icon'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import BrightnessIcon from '@bitrix24/b24icons-vue/main/BrightnessIcon'
import MoonIcon from '@bitrix24/b24icons-vue/outline/MoonIcon'
import ReportSettingsModal from '@/components/report/ReportSettingsModal.vue'
import { useThemeStore, useThemeStoreRefs } from '@/stores/theme'

// const emit = defineEmits<{
//   openSettings: []
// }>()

const themeStore = useThemeStore()
const { isDark } = useThemeStoreRefs()

const items = [
  {
    label: 'Отчет',
    to: { name: 'home' },
  },
  {
    label: 'Аналитика',
    to: { name: 'analytics' },
  },
  {
    label: 'Документация',
    to: { name: 'documentation' },
  },
  {
    label: 'Сформировать отчет',
    to: { name: 'report' },
  },
]
</script>

<template>
  <header
    class="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#252525] dark:text-white"
  >
    <B24NavigationMenu :items="items" class="w-full" />
    <div class="flex items-center gap-2">
      <B24Slideover title="Настройки">
        <ButtonComponent
          variant="ghost"
          size="icon"
          class="rounded-lg border-none"
          aria-label="Настройки"
        >
          <!-- @click="emit('openSettings')" -->
          <Filter1Icon class="w-8 h-8" />
        </ButtonComponent>
        <template #body>
          <ReportSettingsModal />
        </template>
      </B24Slideover>
      <ButtonComponent
        variant="ghost"
        size="icon"
        class="rounded-lg border-none"
        aria-label="Сменить тему"
        @click="themeStore.toggleTheme()"
      >
        <BrightnessIcon v-if="!isDark" class="w-8 h-8" />
        <MoonIcon v-else class="w-8 h-8" />
      </ButtonComponent>
    </div>
  </header>
</template>
