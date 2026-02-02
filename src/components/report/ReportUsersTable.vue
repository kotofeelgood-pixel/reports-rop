<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import LinkComponent from '@/components/navigation/link/LinkComponent.vue'
import UserCallsModal from './UserCallsModal.vue'
import SelectComponent from '@/components/select/SelectComponent.vue'
import InputDateComponent from '@/components/form/input-date/InputDateComponent.vue'

type Row = {
  id: string
  name: string
  outgoing: number
  incoming: number
  missed: number
  processedMissed: number
  duration: string
}

type Call = {
  id: string
  time: string
  number: string
  type: string
  duration: string
  status: string
  crm: string
  hasRecording: boolean
}

type Totals = {
  outgoing: number
  incoming: number
  missed: number
  processedMissed: number
  duration: string
}

type SortKey = 'name' | 'outgoing' | 'incoming' | 'missed' | 'processedMissed' | 'duration'
type SortDir = 'asc' | 'desc'

const props = defineProps<{
  rows: Row[]
  totals: Totals
}>()

const rows = computed(() => props.rows)
const tableTotals = computed(() => props.totals)

const sortBy = ref<SortKey | null>(null)
const sortDir = ref<SortDir>('asc')

const dateRange = ref<string | null>(null)
const dateValue = ref(null)
const selectedUser = ref<string | null>(null)

const showDatePicker = computed(() => dateRange.value === 'custom')

watch(dateRange, (newVal) => {
  console.log('Date range changed:', newVal, 'showDatePicker:', showDatePicker.value)
})

const dateRangeOptions = [
  { label: 'В реальном времени', value: 'realtime' },
  { label: 'Сегодня', value: 'today' },
  { label: 'Вчера', value: 'yesterday' },
  { label: 'Эта неделя', value: 'this_week' },
  { label: 'Прошлая неделя', value: 'last_week' },
  { label: 'Этот месяц', value: 'this_month' },
  { label: 'Прошлый месяц', value: 'last_month' },
  { label: 'Произвольный период', value: 'custom' },
]

const userOptions = computed(() => [
  { label: 'Все пользователи', value: null },
  ...rows.value.map(row => ({ label: row.name, value: row.id }))
])

const isCallsModalOpen = ref(false)
const selectedUserName = ref('')
const selectedCallType = ref('')
const selectedCalls = ref<Call[]>([])

function openCallsModal(userName: string, callType: string) {
  selectedUserName.value = userName
  selectedCallType.value = callType
  // Тестовые данные
  selectedCalls.value = [
    {
      id: '1',
      time: '09:15:32',
      number: '79161234567',
      type: 'Исходящий',
      duration: '00:03:45',
      status: 'Завершен',
      crm: 'Иван Петров',
      hasRecording: true,
    },
    {
      id: '2',
      time: '10:22:18',
      number: '79267894561',
      type: 'Входящий',
      duration: '00:05:12',
      status: 'Завершен',
      crm: 'Мария Сидорова',
      hasRecording: true,
    },
    {
      id: '3',
      time: '11:20:19',
      number: '79640774400',
      type: 'Исходящий',
      duration: '00:00:00',
      status: 'Вызов отменен',
      crm: 'Евгений',
      hasRecording: false,
    },
    {
      id: '4',
      time: '12:45:08',
      number: '79151239876',
      type: 'Входящий',
      duration: '00:02:33',
      status: 'Завершен',
      crm: 'Алексей Козлов',
      hasRecording: true,
    },
    {
      id: '5',
      time: '13:10:55',
      number: '79039876543',
      type: 'Пропущенный',
      duration: '00:00:00',
      status: 'Не отвечен',
      crm: 'Ольга Смирнова',
      hasRecording: false,
    },
    {
      id: '6',
      time: '14:33:21',
      number: '79267771234',
      type: 'Исходящий',
      duration: '00:01:15',
      status: 'Завершен',
      crm: 'Дмитрий Волков',
      hasRecording: true,
    },
    {
      id: '7',
      time: '15:52:44',
      number: '79121234567',
      type: 'Входящий',
      duration: '00:04:28',
      status: 'Завершен',
      crm: 'Елена Новикова',
      hasRecording: true,
    },
  ]
  isCallsModalOpen.value = true
}

function parseDuration(s: string): number {
  const [h, m, sec] = s.split(':').map(Number)
  return (h ?? 0) * 3600 + (m ?? 0) * 60 + (sec ?? 0)
}

function setSort(key: SortKey) {
  if (sortBy.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortDir.value = 'asc'
  }
}

const sortedRows = computed(() => {
  const data = [...rows.value]
  if (!sortBy.value) return data
  const dir = sortDir.value === 'asc' ? 1 : -1
  return data.sort((a, b) => {
    let cmp = 0
    switch (sortBy.value) {
      case 'name':
        cmp = a.name.localeCompare(b.name)
        break
      case 'outgoing':
        cmp = a.outgoing - b.outgoing
        break
      case 'incoming':
        cmp = a.incoming - b.incoming
        break
      case 'missed':
        cmp = a.missed - b.missed
        break
      case 'processedMissed':
        cmp = a.processedMissed - b.processedMissed
        break
      case 'duration':
        cmp = parseDuration(a.duration) - parseDuration(b.duration)
        break
      default:
        return 0
    }
    return cmp * dir
  })
})
</script>

<template>
  <section class="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#252525]">
    <h2 class="border-b border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#252525] dark:text-white">Пользователи</h2>

    <!-- Фильтры -->
    <div class="border-b border-gray-200 px-4 py-4 dark:border-gray-700">
      <div class="grid grid-cols-2 gap-4">
        <!-- Фильтр по дате -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Дата</label>
          <div class="flex gap-2">
            <SelectComponent
              v-model="dateRange"
              :items="dateRangeOptions"
              placeholder="Диапазон"
              :class="dateRange === 'custom' ? '!w-auto min-w-[200px]' : '!w-full'"
              :style="dateRange === 'custom' ? 'width: auto !important; min-width: 200px;' : 'width: 100% !important;'"
            />
            <InputDateComponent
              v-if="showDatePicker"
              v-model="dateValue"
              range
              placeholder="27.02.2025 -"
              class="flex-1"
            />
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
              @click="openCallsModal(row.name, 'исходящие')"
            >
              {{ row.outgoing }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400"
              @click="openCallsModal(row.name, 'входящие')"
            >
              {{ row.incoming }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400"
              @click="openCallsModal(row.name, 'пропущенные')"
            >
              {{ row.missed }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-orange-600 transition-all hover:underline hover:opacity-80 dark:text-orange-400"
              @click="openCallsModal(row.name, 'обработанные пропущенные')"
            >
              {{ row.processedMissed }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ row.duration }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-gray-200 bg-[#e0f7fc] font-medium dark:border-gray-600 dark:bg-[#1e3a47]">
            <td class="px-4 py-2 dark:text-gray-300">ИТОГИ:</td>
            <td class="px-4 py-2 text-green-600 dark:text-green-400">{{ tableTotals.outgoing }}</td>
            <td class="px-4 py-2 text-[#2563eb] dark:text-blue-400">{{ tableTotals.incoming }}</td>
            <td class="px-4 py-2 text-red-600 dark:text-red-400">{{ tableTotals.missed }}</td>
            <td class="px-4 py-2 text-orange-600 dark:text-orange-400">{{ tableTotals.processedMissed }}</td>
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

