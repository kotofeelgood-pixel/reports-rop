<script setup lang="ts">
import { RouterView } from 'vue-router'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import TelegramIcon from '@bitrix24/b24icons-vue/social/TelegramIcon'

const items: NavigationMenuItem[] = [
  {
    label: 'Главная',
    to: '/',
  },
  {
    label: 'Отчеты',
    to: '/report',
  },
  {
    label: 'Таблицы',
    to: '/report/tables',
  },
  {
    label: 'Документация',
    to: '/documentation',
  },
  {
    label: 'Настройки',
    to: '/settings',
  },
]

const pushToMax = () => {
  window.open('https://max.ru/id2308272410_bot', '_blank')
}

const pushToTelegram = () => {
  window.open('https://t.me/itcenterpro23bot', '_blank')
}
</script>

<template>
  <!-- <B24ConfigProvider locale="ru-RU"> -->
  <B24App>
    <B24Card class="mt-4 mx-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 grow">
          <p class="text-2xl font-bold shrink-0">Отчет Ропа</p>
          <B24NavigationMenu :items="items" class="grow" />
        </div>
        <div class="flex items-center gap-2">
          <B24Modal title="Обратная связь">
            <B24Button label="Обратная связь" color="air-primary" />

            <template #body>
              <p class="mb-4">
                Поделитесь, пожалуйста, вашими идеями, пожеланиями или сообщите об ошибке в отчете.
              </p>
              <div class="grid grid-cols-2 gap-2 w-[480px] max-w-full">
                <B24Button label="MAX" color="air-primary" size="xl" @click="pushToMax">
                  <div class="w-4 h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
                      <path
                        fill="#fff"
                        d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"
                      />
                    </svg>
                  </div>
                  <p>MAX</p>
                </B24Button>
                <B24Button
                  label="Telegram"
                  color="air-primary"
                  size="xl"
                  :icon="TelegramIcon"
                  @click="pushToTelegram"
                />
              </div>
            </template>
          </B24Modal>
          <B24ColorModeButton />
        </div>
      </div>
    </B24Card>
    <RouterView />
  </B24App>
  <!-- </B24ConfigProvider> -->
</template>
