<script setup lang="ts">
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import ProgressComponent from '@/components/progress/ProgressComponent.vue'

const completedCalls = [
  { name: 'Кудрявцев Арсений', count: 26, max: 26 },
  { name: 'Петрова Евгения', count: 13, max: 26 },
  { name: 'Попова София', count: 8, max: 26 },
  { name: 'Семенова Анастасия', count: 7, max: 26 },
  { name: 'Лебедева Мария', count: 6, max: 26 },
]

const missedCalls = [
  { name: 'Лебедева Мария', count: 11, max: 11 },
  { name: 'Семенова Анастасия', count: 6, max: 11 },
  { name: 'Кудрявцев Арсений', count: 3, max: 11 },
  { name: 'Попова София', count: 2, max: 11 },
]
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525]">
    <h2 class="text-base font-semibold text-gray-900 dark:text-white">Рейтинг сотрудников</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 bg-[#2fc6f6] px-3 py-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-white">Совершенные звонки</span>
          <span class="flex size-5 shrink-0 items-center justify-center rounded-full border border-white/80 bg-transparent text-[10px] text-white" aria-hidden="true">?</span>
        </div>
        <ul class="space-y-2 p-2">
          <li
            v-for="item in completedCalls"
            :key="item.name"
            class="flex items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-2 dark:bg-gray-800"
          >
            <div class="flex min-w-0 items-center gap-2">
              <AvatarComponent :name="item.name" size="sm" />
              <span class="min-w-0 truncate text-sm text-gray-900 dark:text-white">{{ item.name }}</span>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <div class="w-[100px]">
                <ProgressComponent
                  :model-value="item.count"
                  :max="item.max"
                  color="air-primary-success"
                  size="sm"
                  class="w-full"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.count }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="bg-[#2fc6f6] px-3 py-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-white">Пропущенные</span>
        </div>
        <ul class="space-y-2 p-2">
          <li
            v-for="item in missedCalls"
            :key="item.name"
            class="flex items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-2 dark:bg-gray-800"
          >
            <div class="flex min-w-0 items-center gap-2">
              <AvatarComponent :name="item.name" size="sm" />
              <span class="min-w-0 truncate text-sm text-gray-900 dark:text-white">{{ item.name }}</span>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <div class="w-[100px]">
                <ProgressComponent
                  :model-value="item.count"
                  :max="item.max"
                  color="air-primary-alert"
                  size="sm"
                  class="w-full"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.count }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

