<script setup lang="ts">
import { computed, ref } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import LinkComponent from '@/components/navigation/link/LinkComponent.vue'
import UserCallsModal from './UserCallsModal.vue'
import SelectComponent from '@/components/select/SelectComponent.vue'
import CalendarComponent from '@/components/element/calendar/CalendarComponent.vue'
import PopoverComponent from '@/components/overlay/popover/PopoverComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import { useTableSort } from '@/composables/useTableSort'
import { useCallsModal } from '@/composables/useCallsModal'
import { useDateRange } from '@/composables/useDateRange'

type Row = {
  id: string
  name: string
  outgoing: number
  incoming: number
  missed: number
  processedMissed: number
  duration: string
}

type Totals = {
  outgoing: number
  incoming: number
  missed: number
  processedMissed: number
  duration: string
}

const props = defineProps<{
  rows: Row[]
  totals: Totals
}>()

const rows = computed(() => props.rows)
const tableTotals = computed(() => props.totals)

const { sortBy, sortDir, setSort, sortedRows } = useTableSort(rows)

const {
  dateRange,
  dateValue,
  isDatePickerOpen,
  showDatePicker,
  dateDisplayValue,
  dateRangeOptions,
} = useDateRange()

const selectedUser = ref<string | null>(null)

const userOptions = computed(() => [
  { label: 'Все пользователи', value: null },
  ...rows.value.map(row => ({ label: row.name, value: row.id }))
])

const { isCallsModalOpen, selectedUserName, selectedCallType, selectedCalls, openCallsModal, openTotalsCallsModal } = useCallsModal(rows)
</script>

<template>
  <section class="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#252525]">
    <h2 class="border-b border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#252525] dark:text-white">Пользователи</h2>

    <!-- Фильтры -->
    <div class="border-b border-gray-200 px-4 py-4 dark:border-gray-700">
      <div class="flex gap-2">
        <!-- Фильтр по дате -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Дата</label>
          <div class="flex gap-2">
            <SelectComponent
              v-model="dateRange"
              :items="dateRangeOptions"
              :class="dateRange === 'custom' ? '!w-auto min-w-[200px]' : '!w-full'"
              :style="dateRange === 'custom' ? 'width: auto !important; min-width: 200px;' : 'width: 100% !important;'"
            />
            <PopoverComponent
              v-if="showDatePicker"
              v-model:open="isDatePickerOpen"
              side="bottom"
              align="start"
              class="flex-1"
            >
              <ButtonComponent
                icon="calendar"
                color="light-border"
                size="md"
                class="w-full"

                @click="isDatePickerOpen = true"
              >
            {{ dateDisplayValue }}
            </ButtonComponent>
              <template #content>
                <div class="p-4">
                  <CalendarComponent
                    v-model="dateValue"
                    range
                    locale="ru-RU"
                  />
                </div>
              </template>
            </PopoverComponent>
          </div>
        </div>

        <!-- Фильтр по пользователям -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Пользователи</label>
          <SelectComponent
            v-model="selectedUser"
            :items="userOptions"
            placeholder="ОТВЕТСТВЕННЫЙ"
            class="!w-full"
            style="width: 100% !important;"
          />
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <table class="w-full text-left text-sm">
        <thead class="sticky top-0 z-10 bg-[#e0f7fc] text-gray-700 dark:bg-[#1e3a47] dark:text-gray-300">
          <tr>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('name')"
              @keydown.enter="setSort('name')"
            >
              <span class="inline-flex items-center gap-1">
                ОТВЕТСТВЕННЫЙ
                <span v-if="sortBy === 'name'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('outgoing')"
              @keydown.enter="setSort('outgoing')"
            >
              <span class="inline-flex items-center gap-1">
                <span class="inline-block size-4 rounded bg-green-500/80" />
                ИСХ.
                <span v-if="sortBy === 'outgoing'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('incoming')"
              @keydown.enter="setSort('incoming')"
            >
              <span class="inline-flex items-center gap-1">
                <span class="inline-block size-4 rounded bg-[#2fc6f6]/80" />
                ВХОД.
                <span v-if="sortBy === 'incoming'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('missed')"
              @keydown.enter="setSort('missed')"
            >
              <span class="inline-flex items-center gap-1">
                <span class="inline-block size-4 rounded bg-red-500/80" />
                ПР.
                <span v-if="sortBy === 'missed'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('processedMissed')"
              @keydown.enter="setSort('processedMissed')"
            >
              <span class="inline-flex items-center gap-1">
                <span class="inline-block size-4 rounded bg-orange-500/80" />
                ОБ. ПР.
                <span v-if="sortBy === 'processedMissed'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('duration')"
              @keydown.enter="setSort('duration')"
            >
              <span class="inline-flex items-center gap-1">
                ДЛИТЕЛЬНОСТЬ
                <span v-if="sortBy === 'duration'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in sortedRows"
            :key="row.id"
            class="border-t border-gray-100 hover:bg-gray-50/80 dark:border-gray-700 dark:hover:bg-gray-800/50"
          >
            <td class="px-4 py-2">
              <div class="flex items-center gap-2">
                <AvatarComponent :name="row.name" size="sm" />
                <LinkComponent :to="`#user-${row.id}`" class="text-[#2563eb] hover:underline">
                  {{ row.name }}
                </LinkComponent>
              </div>
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-green-600 transition-all hover:underline hover:opacity-80 dark:text-green-400"
              @click="openCallsModal(row.id, row.name, 'исходящие')"
            >
              {{ row.outgoing }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400"
              @click="openCallsModal(row.id, row.name, 'входящие')"
            >
              {{ row.incoming }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400"
              @click="openCallsModal(row.id, row.name, 'пропущенные')"
            >
              {{ row.missed }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-orange-600 transition-all hover:underline hover:opacity-80 dark:text-orange-400"
              @click="openCallsModal(row.id, row.name, 'обработанные пропущенные')"
            >
              {{ row.processedMissed }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ row.duration }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-gray-200 bg-[#e0f7fc] font-medium dark:border-gray-600 dark:bg-[#1e3a47]">
            <td class="px-4 py-2 dark:text-gray-300">ИТОГИ:</td>
            <td
              class="cursor-pointer px-4 py-2 text-green-600 transition-all hover:underline hover:opacity-80 dark:text-green-400"
              @click="openTotalsCallsModal('исходящие')"
            >
              {{ tableTotals.outgoing }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400"
              @click="openTotalsCallsModal('входящие')"
            >
              {{ tableTotals.incoming }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400"
              @click="openTotalsCallsModal('пропущенные')"
            >
              {{ tableTotals.missed }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 text-orange-600 transition-all hover:underline hover:opacity-80 dark:text-orange-400"
              @click="openTotalsCallsModal('обработанные пропущенные')"
            >
              {{ tableTotals.processedMissed }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ tableTotals.duration }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <UserCallsModal
      v-model:open="isCallsModalOpen"
      :user-name="selectedUserName"
      :call-type="selectedCallType"
      :calls="selectedCalls"
    />
  </section>
</template>

