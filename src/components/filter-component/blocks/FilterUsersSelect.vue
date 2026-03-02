<!-- Выбор сотрудников: кнопка открывает модалку со списком, сгруппированным по отделам. -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { useUsersStore } from '@/stores/users'
import { useDepartmentsStore } from '@/stores/departments'

const reportFilters = useReportFiltersStore()
const usersStore = useUsersStore()
const departmentsStore = useDepartmentsStore()

const { selectedUserIds } = storeToRefs(reportFilters)
const { users, isLoading: isUsersLoading } = storeToRefs(usersStore)
const { departmentsById, isLoading: isDepartmentsLoading } = storeToRefs(departmentsStore)

const selectedCount = computed(() => selectedUserIds.value?.length ?? 0)

const search = defineModel<string>()

const isLoadingAny = computed(() => isUsersLoading.value || isDepartmentsLoading.value)

const selectAll = computed({
  get: () => users.value.length > 0 && selectedUserIds.value.length === users.value.length,
  set: (v: boolean) => {
    selectedUserIds.value = v ? users.value.map((u) => u.id) : []
  },
})

const departmentGroups = computed(() => {
  const q = (search.value ?? '').toString().trim().toLowerCase()
  const groups = new Map<
    string,
    {
      id: string
      name: string
      users: typeof users.value
    }
  >()

  for (const user of users.value) {
    const deptId = user.departmentIds[0] ?? 'other'
    const dept = departmentsById.value.get(deptId)
    const name = dept?.name ?? 'Без отдела'

    if (!groups.has(deptId)) {
      groups.set(deptId, { id: deptId, name, users: [] as typeof users.value })
    }

    groups.get(deptId)!.users.push(user)
  }

  const result = Array.from(groups.values())

  for (const group of result) {
    group.users.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  }

  result.sort((a, b) => a.name.localeCompare(b.name, 'ru'))

  if (!q) return result

  return result
    .map((group) => ({
      ...group,
      users: group.users.filter((u) => u.name.toLowerCase().includes(q)),
    }))
    .filter((group) => group.users.length > 0)
})

const toggleUser = (id: string, checked: boolean) => {
  if (checked) {
    if (!selectedUserIds.value.includes(id)) {
      selectedUserIds.value = [...selectedUserIds.value, id]
    }
  } else {
    selectedUserIds.value = selectedUserIds.value.filter((x) => x !== id)
  }
}

onMounted(() => {
  usersStore.fetchUsers()
  departmentsStore.fetchDepartments()
})
</script>

<template>
  <B24Modal title="Выбор сотрудников">
    <B24Button
      :label="`Выбрано сотрудников: ${selectedCount}`"
      color="air-secondary-accent-1"
      size="md"
    />

    <template #body>
      <div class="min-w-96 max-h-[560px] space-y-4">
        <B24Input
          v-model="search"
          placeholder="Поиск по имени сотрудника"
          size="md"
          class="w-full"
        />

        <B24Checkbox v-model="selectAll" label="Выбрать все" />

        <div class="mt-2 space-y-4 overflow-y-auto pr-2">
          <div v-for="group in departmentGroups" :key="group.id" class="space-y-2">
            <p class="text-sm font-semibold">
              {{ group.name }}
            </p>

            <div class="space-y-1">
              <label
                v-for="user in group.users"
                :key="user.id"
                class="flex items-center gap-3 rounded-md py-1 hover:bg-slate-50"
              >
                <B24Checkbox
                  :model-value="selectedUserIds.includes(user.id)"
                  @update:model-value="(checked) => toggleUser(user.id, checked as boolean)"
                />

                <B24User
                  :name="user.name"
                  :avatar="{ src: user.photo, alt: user.name }"
                  size="sm"
                  class="flex-1"
                />
              </label>
            </div>
          </div>

          <p v-if="!departmentGroups.length && !isLoadingAny" class="text-sm text-gray-500">
            Ничего не найдено
          </p>
        </div>

        <p v-if="isLoadingAny" class="text-sm text-gray-500">Загрузка...</p>
      </div>
    </template>
  </B24Modal>
</template>
