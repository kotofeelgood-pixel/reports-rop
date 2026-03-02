<!-- Выбор сотрудников: кнопка открывает Drawer со списком. -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { useUsersStore } from '@/stores/users'

const reportFilters = useReportFiltersStore()
const usersStore = useUsersStore()
const { selectedUserIds } = storeToRefs(reportFilters)
const { users, isLoading } = storeToRefs(usersStore)

const selectedCount = computed(() => selectedUserIds.value?.length ?? 0)
const userItems = computed(() => users.value.map((u) => ({ value: u.id, label: u.name })))

const selectAll = computed({
  get: () => users.value.length > 0 && selectedUserIds.value.length === users.value.length,
  set: (v: boolean) => {
    selectedUserIds.value = v ? users.value.map((u) => u.id) : []
  },
})

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<template>
  <B24Drawer direction="right" inset>
    <B24Button
      :label="`Выбрано сотрудников: ${selectedCount}`"
      color="air-secondary-accent-1"
      size="md"
    />

    <template #content>
      <div class="min-w-96 space-y-4 p-4">
        <p class="text-sm font-medium">Сотрудники</p>
        <B24Checkbox v-model="selectAll" label="Выбрать все" />
        <B24CheckboxGroup
          v-model="selectedUserIds"
          :items="userItems"
          value-key="value"
          label-key="label"
          variant="list"
          orientation="vertical"
        />
        <p v-if="isLoading" class="text-sm text-gray-500">Загрузка...</p>
      </div>
    </template>
  </B24Drawer>
</template>
