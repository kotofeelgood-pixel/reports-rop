<script setup lang="ts">
import { ref } from 'vue'
import ReportHeader from '@/components/report/ReportHeader.vue'
import ReportUsersTable from '@/components/report/ReportUsersTable.vue'
import ReportChart from '@/components/report/ReportChart.vue'
import ReportRating from '@/components/report/ReportRating.vue'
import ReportSettingsModal from '@/components/report/ReportSettingsModal.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'

const { layoutType } = useReportSettingsStoreRefs()

const tableData = [
  { id: '1', name: 'Лебедева Мария', outgoing: 2, incoming: 15, missed: 11, processedMissed: 0, duration: '00:17:26' },
  { id: '2', name: 'Семенова Анастасия', outgoing: 2, incoming: 11, missed: 6, processedMissed: 2, duration: '00:23:39' },
  { id: '3', name: 'Кудрявцев Арсений', outgoing: 24, incoming: 5, missed: 3, processedMissed: 3, duration: '00:20:49' },
  { id: '4', name: 'Попова София', outgoing: 7, incoming: 3, missed: 2, processedMissed: 2, duration: '00:14:02' },
  { id: '5', name: 'Петрова Евгения', outgoing: 10, incoming: 3, missed: 0, processedMissed: 0, duration: '00:06:43' },
  { id: '6', name: 'Дементьева Анастасия', outgoing: 1, incoming: 2, missed: 0, processedMissed: 0, duration: '00:05:12' },
  { id: '7', name: 'Озерова Алиса', outgoing: 0, incoming: 1, missed: 0, processedMissed: 0, duration: '00:02:30' },
  { id: '8', name: 'Тихомирова Вероника', outgoing: 1, incoming: 0, missed: 0, processedMissed: 0, duration: '00:03:15' },
  { id: '9', name: 'Сахарова Камилла', outgoing: 0, incoming: 1, missed: 0, processedMissed: 0, duration: '00:01:40' },
  { id: '10', name: 'Ларионов Степан', outgoing: 1, incoming: 0, missed: 0, processedMissed: 0, duration: '00:04:20' },
  { id: '11', name: 'Игнатов Артём', outgoing: 1, incoming: 0, missed: 0, processedMissed: 0, duration: '00:02:05' },
]

const totals = {
  outgoing: 49,
  incoming: 43,
  missed: 22,
  processedMissed: 7,
  duration: '02:22:47',
}

const isSettingsOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50 dark:bg-[#1a1a1a]">
    <ReportHeader @openSettings="isSettingsOpen = true" />

    <!-- Расположение столбцами (таблица слева, график+рейтинг справа) -->
    <main
      v-if="layoutType === 'columns'"
      class="flex flex-1 gap-4 overflow-hidden p-4"
    >
      <ReportUsersTable
        :rows="tableData"
        :totals="totals"
      />
      <aside class="flex min-w-0 flex-1 flex-col gap-4">
        <ReportChart />
        <ReportRating />
      </aside>
    </main>

    <!-- Расположение строками (таблица сверху, график и рейтинг снизу рядом) -->
    <main
      v-else
      class="flex flex-1 flex-col gap-4 overflow-hidden p-4"
    >
      <ReportUsersTable
        :rows="tableData"
        :totals="totals"
      />
      <div class="flex min-h-0 flex-1 gap-4 overflow-hidden" :class="layoutType === 'rows' ? 'flex-col' : 'flex-row'">
        <div class="flex min-w-0 flex-1">
          <ReportChart />
        </div>
        <div class="flex min-w-0 flex-1">
          <ReportRating />
        </div>
      </div>
    </main>

    <ReportSettingsModal
      v-model:open="isSettingsOpen"
      :employees="tableData"
    />
  </div>
</template>
