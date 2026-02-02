<script setup lang="ts">
import { computed, ref } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import LinkComponent from '@/components/navigation/link/LinkComponent.vue'

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
            <td class="px-4 py-2 font-medium text-green-600 dark:text-green-400">{{ row.outgoing }}</td>
            <td class="px-4 py-2 font-medium text-[#2563eb] dark:text-blue-400">{{ row.incoming }}</td>
            <td class="px-4 py-2 font-medium text-red-600 dark:text-red-400">{{ row.missed }}</td>
            <td class="px-4 py-2 font-medium text-orange-600 dark:text-orange-400">{{ row.processedMissed }}</td>
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
  </section>
</template>

