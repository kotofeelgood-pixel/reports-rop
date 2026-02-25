<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ReportHeader from '@/components/report/ReportHeader.vue'
import ReportUsersTable from '@/components/report/ReportUsersTable.vue'
import ReportChart from '@/components/report/ReportChart.vue'
import ReportRating from '@/components/report/ReportRating.vue'
import ReportSettingsModal from '@/components/report/ReportSettingsModal.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore } from '@/stores/users'
import { useAnalyticsCalls } from '@/composables/useAnalyticsCalls'

const { layoutType } = useReportSettingsStoreRefs()
const usersStore = useUsersStore()
const { calls } = useAnalyticsCalls()

onMounted(() => {
  void usersStore.fetchUsers()
})

const isSettingsOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50 dark:bg-[#1a1a1a]">
    <ReportHeader @openSettings="isSettingsOpen = true" />

    <!-- Расположение столбцами (таблица слева, график+рейтинг справа) -->
    <main v-if="layoutType === 'columns'" class="flex flex-1 gap-4 overflow-hidden p-4">
      <ReportUsersTable :calls="calls" />
      <aside class="flex min-w-0 flex-1 flex-col gap-4">
        <ReportChart :calls="calls" />
        <ReportRating :calls="calls" />
      </aside>
    </main>

    <!-- Расположение строками (таблица сверху, график и рейтинг снизу рядом) -->
    <main v-else class="flex flex-1 flex-col gap-4 overflow-hidden p-4">
      <ReportUsersTable :calls="calls" />
      <div
        class="flex min-h-0 flex-1 gap-4 overflow-hidden"
        :class="layoutType === 'rows' ? 'flex-col' : 'flex-row'"
      >
        <div class="flex min-w-0 flex-1">
          <ReportChart :calls="calls" />
        </div>
        <div class="flex min-w-0 flex-1">
          <ReportRating :calls="calls" />
        </div>
      </div>
    </main>

    <ReportSettingsModal v-model:open="isSettingsOpen" />
  </div>
</template>
