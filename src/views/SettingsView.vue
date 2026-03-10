<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const {
  excludedEmployeeIds,
  employeeColors,
  chartType,
  layoutType,
  minCallDurationSeconds,
} = useReportSettingsStoreRefs()

const { hideCallsSection, hideLeadsSection, hideDealsSection } = useReportFiltersStoreRefs()
const { users, isLoading } = useUsersStoreRefs()
const usersStore = useUsersStore()

onMounted(() => {
  usersStore.fetchUsers()
})

const searchExcluded = ref('')

const filteredUsersForExclude = computed(() => {
  const q = searchExcluded.value.trim().toLowerCase()
  if (!q) return users.value
  return users.value.filter((u) => u.name.toLowerCase().includes(q))
})

const excludedCount = computed(() => excludedEmployeeIds.value.length)

const toggleExcluded = (id: string, checked: boolean) => {
  if (checked) {
    if (!excludedEmployeeIds.value.includes(id)) {
      excludedEmployeeIds.value = [...excludedEmployeeIds.value, id]
    }
  } else {
    excludedEmployeeIds.value = excludedEmployeeIds.value.filter((x) => x !== id)
  }
}

const colorUserId = ref<string | null>(null)
const colorValue = ref('#B1F576')

const userItems = computed(() =>
  users.value.map((u) => ({
    value: u.id,
    label: u.name,
  })),
)

const currentColorUser = computed(() =>
  colorUserId.value ? users.value.find((u) => u.id === colorUserId.value) ?? undefined : undefined,
)

const applySavedColor = () => {
  if (!colorUserId.value) return
  const stored = employeeColors.value[colorUserId.value]
  if (stored) {
    colorValue.value = stored
  }
}

const handleSelectColorUser = (id: string | null | undefined) => {
  colorUserId.value = id ?? null
  colorValue.value = '#B1F576'
  applySavedColor()
}

const saveUserColor = () => {
  if (!colorUserId.value) return
  employeeColors.value = {
    ...employeeColors.value,
    [colorUserId.value]: colorValue.value,
  }
}

const resetUserColor = () => {
  if (!colorUserId.value) return
  const copy = { ...employeeColors.value }
  delete copy[colorUserId.value]
  employeeColors.value = copy
}
</script>

<template>
  <div class="p-4 space-y-4">
    <B24Card>
      <div class="space-y-3">
        <div>
          <p class="text-lg font-semibold">Разграничение доступа</p>
          <p class="text-sm text-gray-500">
            Настройки, позволяющие исключать сотрудников из отчётов и выделять их цветом.
          </p>
        </div>

        <div class="divide-y divide-gray-100">
          <div class="flex items-center justify-between py-3 gap-4">
            <div>
              <p class="font-medium">Исключение сотрудников</p>
              <p class="text-xs text-gray-500">
                Эти сотрудники не будут попадать в отчёты и таблицы.
              </p>
              <p v-if="excludedCount" class="mt-1 text-xs text-gray-500">
                Исключено сотрудников: {{ excludedCount }}
              </p>
            </div>

            <div>
              <B24Modal title="Исключение сотрудников">
                <B24Button
                  label="Настроить исключения"
                  color="air-secondary-accent-1"
                  size="md"
                />

                <template #body>
                  <div class="min-w-96 max-h-[560px] space-y-4">
                    <B24Input
                      v-model="searchExcluded"
                      placeholder="Поиск по имени сотрудника"
                      size="md"
                      class="w-full"
                    />

                    <div class="space-y-2 overflow-y-auto max-h-[420px] pr-2">
                      <p v-if="isLoading" class="text-sm text-gray-500">Загрузка сотрудников...</p>

                      <label
                        v-for="user in filteredUsersForExclude"
                        v-else
                        :key="user.id"
                        class="flex items-center gap-3 rounded-md py-1 px-1 hover:bg-slate-50"
                      >
                        <B24Checkbox
                          :model-value="excludedEmployeeIds.includes(user.id)"
                          @update:model-value="
                            (checked) => toggleExcluded(user.id, checked as boolean)
                          "
                        />

                        <B24User
                          :name="user.name"
                          :avatar="{ src: user.photo ?? undefined, alt: user.name }"
                          size="sm"
                          class="flex-1"
                        />
                      </label>

                      <p
                        v-if="!isLoading && !filteredUsersForExclude.length"
                        class="text-sm text-gray-500"
                      >
                        Ничего не найдено
                      </p>
                    </div>
                  </div>
                </template>
              </B24Modal>
            </div>
          </div>

          <div class="flex items-center justify-between py-3 gap-4">
            <div>
              <p class="font-medium">Цвет для сотрудника</p>
              <p class="text-xs text-gray-500">
                Для каждого сотрудника можно задать свой цвет строки в отчётах.
              </p>
            </div>

            <div>
              <B24Modal title="Цвет для сотрудника в отчёте">
                <B24Button label="Задать цвет" color="air-primary" size="md" />

                <template #body>
                  <div class="min-w-[420px] space-y-4">
                    <div>
                      <p class="mb-2 text-sm font-medium">Сотрудник</p>
                      <B24SelectMenu
                        :model-value="colorUserId ?? undefined"
                        :items="userItems"
                        value-key="value"
                        label-key="label"
                        placeholder="Выбрать сотрудника…"
                        @update:model-value="(v) => handleSelectColorUser(v as string | null)"
                      />
                    </div>

                    <div>
                      <p class="mb-2 text-sm font-medium">Цвет строки в отчёте</p>
                      <div class="flex items-center gap-4">
                        <input
                          v-model="colorValue"
                          type="color"
                          class="h-10 w-16 rounded border border-gray-200 cursor-pointer"
                        />
                        <span class="text-xs text-gray-500">{{ colorValue }}</span>
                      </div>
                    </div>

                    <p class="text-xs text-gray-500">
                      Цвет будет использоваться как фон строки сотрудника в разделе «Отчёт».
                    </p>

                    <div
                      v-if="currentColorUser"
                      class="mt-2 flex items-center justify-between rounded-md border border-gray-100 px-3 py-2"
                    >
                      <div class="flex items-center gap-3">
                        <B24User
                          :name="currentColorUser.name"
                          :avatar="{
                            src: currentColorUser.photo ?? undefined,
                            alt: currentColorUser.name,
                          }"
                          size="sm"
                        />
                        <span
                          class="inline-block h-6 w-12 rounded"
                          :style="{ backgroundColor: colorValue }"
                        />
                      </div>
                      <div class="flex gap-2">
                        <B24Button label="Сбросить" size="xs" variant="outline" @click="resetUserColor" />
                        <B24Button label="Сохранить" size="xs" color="air-primary" @click="saveUserColor" />
                      </div>
                    </div>
                  </div>
                </template>
              </B24Modal>
            </div>
          </div>
        </div>
      </div>
    </B24Card>

    <B24Card>
      <div class="space-y-3">
        <div>
          <p class="text-lg font-semibold">Общие настройки отчёта</p>
          <p class="text-sm text-gray-500">
            Параметры отображения и базовые ограничения, которые будут применяться по умолчанию.
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="font-medium">Тип графика</p>
              <p class="text-xs text-gray-500">Выберите, как отображать динамику показателей.</p>
            </div>
            <div class="flex gap-2">
              <B24Button
                label="Линейный"
                size="xs"
                :variant="chartType === 'line' ? 'primary' : 'outline'"
                @click="chartType = 'line'"
              />
              <B24Button
                label="Столбчатый"
                size="xs"
                :variant="chartType === 'bar' ? 'primary' : 'outline'"
                @click="chartType = 'bar'"
              />
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="font-medium">Расположение блоков отчёта</p>
              <p class="text-xs text-gray-500">
                Отображать блоки отчёта в столбик или в несколько колонок.
              </p>
            </div>
            <div class="flex gap-2">
              <B24Button
                label="Колонки"
                size="xs"
                :variant="layoutType === 'columns' ? 'primary' : 'outline'"
                @click="layoutType = 'columns'"
              />
              <B24Button
                label="Строки"
                size="xs"
                :variant="layoutType === 'rows' ? 'primary' : 'outline'"
                @click="layoutType = 'rows'"
              />
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="font-medium">Минимальная длительность результативного звонка</p>
              <p class="text-xs text-gray-500">
                Звонки короче этого значения не будут считаться результативными.
              </p>
            </div>
            <div class="flex items-center gap-2">
              <B24InputNumber v-model="minCallDurationSeconds" class="w-24" />
              <span class="text-sm text-gray-500">секунд</span>
            </div>
          </div>
        </div>
      </div>
    </B24Card>

    <B24Card>
      <div class="space-y-3">
        <div>
          <p class="text-lg font-semibold">Отображение разделов</p>
          <p class="text-sm text-gray-500">
            Управляйте тем, какие блоки отчёта показывать по умолчанию.
          </p>
        </div>

        <div class="space-y-2">
          <B24Checkbox v-model="hideCallsSection" label="Скрывать раздел «Звонки»" />
          <B24Checkbox v-model="hideLeadsSection" label="Скрывать раздел «Лиды»" />
          <B24Checkbox v-model="hideDealsSection" label="Скрывать раздел «Сделки»" />
        </div>
      </div>
    </B24Card>
  </div>
</template>

<style scoped></style>
