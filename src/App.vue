<script setup lang="ts">
import { RouterView } from 'vue-router'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const items: NavigationMenuItem[] = [
  {
    label: 'Главная',
    to: '/',
  },
  {
    label: 'Отчеты',
  },
]
</script>

<template>
  <!-- <B24ConfigProvider locale="ru-RU"> -->
  <B24App>
    <B24Card class="mt-4 mx-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 grow">
          <p class="text-2xl font-bold flex-shrink-0">Отчет Ропа</p>
          <B24NavigationMenu :items="items" class="grow" />
        </div>
        <div class="flex items-center gap-2">
          <B24Button label="Обратная связь" color="air-primary" />
          <B24ColorModeButton />
        </div>
      </div>
    </B24Card>
    <RouterView />
  </B24App>
  <!-- </B24ConfigProvider> -->
</template>
