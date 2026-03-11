<script setup lang="ts">
//  Отчет по отделу продаж (Таблица)
import { computed, onMounted, ref, watch } from 'vue'
import TCol from '@/components/t-ui/TCol.vue'
import TCell from '@/components/t-ui/TCell.vue'
import TRow from '@/components/t-ui/TRow.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'
import { fetchSalesDepartmentCounters, type SalesDepartmentCounters } from '@/api/salesDepartmentReport'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'

const { dateValue } = useReportSettingsStoreRefs()
const { selectedUserIds, selectedDealDirections, minCallDurationSeconds, refreshToken } = useReportFiltersStoreRefs()
const { users } = useUsersStoreRefs()
const usersStore = useUsersStore()

const rows = ref<SalesDepartmentCounters[]>([])
const isLoading = ref(false)

const formatDuration = (seconds: number): string => {
  const total = Math.max(0, Math.round(Number(seconds || 0)))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}м. ${s}с.`
}

const formatPercent = (value: number): string => `${Number(value || 0).toFixed(2)}%`

const toCategoryIds = (value: string[]): number[] => {
  return value
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n))
}

const formatDate = (value: any): string | null => {
  if (!value) return null

  if (typeof value === 'string') return value

  const anyValue = value as any

  if (typeof anyValue.toDate === 'function') {
    try {
      const jsDate: Date = anyValue.toDate('UTC')
      const y = jsDate.getUTCFullYear()
      const m = jsDate.getUTCMonth() + 1
      const d = jsDate.getUTCDate()
      const mm = String(m).padStart(2, '0')
      const dd = String(d).padStart(2, '0')
      return `${y}-${mm}-${dd}`
    } catch {
      return null
    }
  }

  const obj = value as { year?: number; month?: number; day?: number }
  if (
    typeof obj.year === 'number' &&
    typeof obj.month === 'number' &&
    typeof obj.day === 'number'
  ) {
    const mm = String(obj.month).padStart(2, '0')
    const dd = String(obj.day).padStart(2, '0')
    return `${obj.year}-${mm}-${dd}`
  }

  return null
}

const loadData = async () => {
  const start = formatDate(dateValue.value?.start)
  const end = formatDate(dateValue.value?.end ?? dateValue.value?.start)

  if (!start || !end) {
    rows.value = []
    return
  }

  const userIds = selectedUserIds.value.length ? selectedUserIds.value : ['812']
  const categoryIds = toCategoryIds(selectedDealDirections.value)

  isLoading.value = true
  try {
    const results: SalesDepartmentCounters[] = []

    for (const userId of userIds) {
      const counters = await fetchSalesDepartmentCounters({
        userId,
        dateStart: start,
        dateEnd: end,
        categoryIds,
        minCallDurationSeconds: minCallDurationSeconds.value,
      })
      results.push(counters)
    }

    rows.value = results
  } finally {
    isLoading.value = false
  }
}

const totals = computed(() => {
  return rows.value.reduce(
    (acc, row) => {
      acc.incomingMissed += row.incomingMissed
      acc.incomingAnswered += row.incomingAnswered
      acc.incomingEffective += row.incomingEffective
      acc.incomingDurationSec += row.incomingDurationSec
      acc.incomingEffectiveDurationSec += row.incomingEffectiveDurationSec
      acc.outgoingMissed += row.outgoingMissed
      acc.outgoingAnswered += row.outgoingAnswered
      acc.outgoingEffective += row.outgoingEffective
      acc.outgoingDurationSec += row.outgoingDurationSec
      acc.outgoingEffectiveDurationSec += row.outgoingEffectiveDurationSec
      acc.leadsFromPrevious += row.leadsFromPrevious
      acc.leadsNew += row.leadsNew
      acc.leadsInWorkAtStart += row.leadsInWorkAtStart
      acc.dealsFromPrevious += row.dealsFromPrevious
      acc.dealsNew += row.dealsNew
      acc.dealsInWorkAtStart += row.dealsInWorkAtStart
      acc.dealsWon += row.dealsWon
      acc.dealsLost += row.dealsLost
      acc.revenue += row.revenue
      acc.avgCheck += row.avgCheck
      acc.saleCycleDays += row.saleCycleDays
      acc.finishedCount += row.finishedCount
      acc.notFinishedCount += row.notFinishedCount
      acc.notFinishedAvgDays += row.notFinishedAvgDays
      acc.totalConversion += row.totalConversion
      acc.lostConversion += row.lostConversion
      acc.wonConversion += row.wonConversion
      acc.successShare += row.successShare
      return acc
    },
    {
      incomingMissed: 0,
      incomingAnswered: 0,
      incomingEffective: 0,
      incomingDurationSec: 0,
      incomingEffectiveDurationSec: 0,
      outgoingMissed: 0,
      outgoingAnswered: 0,
      outgoingEffective: 0,
      outgoingDurationSec: 0,
      outgoingEffectiveDurationSec: 0,
      leadsFromPrevious: 0,
      leadsNew: 0,
      leadsInWorkAtStart: 0,
      dealsFromPrevious: 0,
      dealsNew: 0,
      dealsInWorkAtStart: 0,
      dealsWon: 0,
      dealsLost: 0,
      revenue: 0,
      avgCheck: 0,
      saleCycleDays: 0,
      finishedCount: 0,
      notFinishedCount: 0,
      notFinishedAvgDays: 0,
      totalConversion: 0,
      lostConversion: 0,
      wonConversion: 0,
      successShare: 0,
    },
  )
})

const totalsIncomingRate = computed(() =>
  totals.value.incomingAnswered
    ? (totals.value.incomingEffective / totals.value.incomingAnswered) * 100
    : 0,
)

const totalsOutgoingRate = computed(() =>
  totals.value.outgoingAnswered
    ? (totals.value.outgoingEffective / totals.value.outgoingAnswered) * 100
    : 0,
)

const totalsIncomingAvgDuration = computed(() =>
  totals.value.incomingAnswered
    ? totals.value.incomingDurationSec / totals.value.incomingAnswered
    : 0,
)

const totalsOutgoingAvgDuration = computed(() =>
  totals.value.outgoingAnswered
    ? totals.value.outgoingDurationSec / totals.value.outgoingAnswered
    : 0,
)

const totalsAvgCheck = computed(() =>
  rows.value.length ? totals.value.avgCheck / rows.value.length : 0,
)

const totalsSaleCycleDays = computed(() =>
  rows.value.length ? totals.value.saleCycleDays / rows.value.length : 0,
)

const totalsNotFinishedAvgDays = computed(() =>
  rows.value.length ? totals.value.notFinishedAvgDays / rows.value.length : 0,
)

const getUserNameById = (id: string): string => {
  const user = users.value.find((u) => u.id === id)
  if (user?.name) return user.name
  return id
}

onMounted(async () => {
  await usersStore.fetchUsers()
  await loadData()
})

watch(
  () => ({
    start: dateValue.value?.start,
    end: dateValue.value?.end,
    ids: [...selectedUserIds.value],
    refresh: refreshToken.value,
  }),
  () => {
    void loadData()
  },
  { deep: true },
)
</script>

<template>
  <div class="report-table-scroll" data-simplebar data-simplebar-auto-hide="false">
    <table>
      <thead>
        <TRow>
          <TCol title="" :colspan="1" />
          <TCol title="Звонки входящие" :colspan="7" />
          <TCol title="Звонки исходящие" :colspan="7" />
          <TCol title="Лиды" :colspan="16" />
          <TCol title="Сделки" :colspan="20" />
        </TRow>
        <!-- -------------------Первая линия заголовка -->
        <TRow>
          <!-- Звонки входящие -->
          <TCol title="Менеджер" class="leading-3" font-size="12px" />
          <TCol title="Пропустил" class="leading-3" font-size="12px" />
          <TCol title="Поговорил" class="leading-3" font-size="12px" />
          <TCol title="Результативно" class="leading-3" font-size="12px" />
          <TCol title="Процент результативных" class="leading-3" font-size="12px" />
          <TCol title="Длительность" class="leading-3" font-size="12px" />
          <TCol title="Длительность результативных" class="leading-3" font-size="12px" />
          <TCol title="Средняя длительность" class="leading-3" font-size="12px" />
          <!-- Звонки исходящие -->
          <TCol title="Не дозвонился" class="leading-3" font-size="12px" />
          <TCol title="Дозвонился" class="leading-3" font-size="12px" />
          <TCol title="Результативно" class="leading-3" font-size="12px" />
          <TCol title="Процент результативных" class="leading-3" font-size="12px" />
          <TCol title="Длительность результативных" class="leading-3" font-size="12px" />
          <TCol title="Средняя длительность" class="leading-3" font-size="12px" />
          <!-- Звонки Лиды -->
          <TCol title="C прошлого периода" class="leading-3" font-size="12px" />
          <TCol title="Новые" class="leading-3" font-size="12px" />
          <TCol title="В работе" class="leading-3" font-size="12px" />
          <TCol title="С движениями по статусам" class="leading-3" font-size="12px" />
          <TCol title="Без движения по статусам" class="leading-3" font-size="12px" />
          <TCol title="Брак" class="leading-3" font-size="12px" />
          <TCol title="Цикл брако" class="leading-3" font-size="12px" />
          <TCol title="Конвертированные" class="leading-3" font-size="12px" />
          <TCol title="Цикл конверсии" class="leading-3" font-size="12px" />
          <TCol title="Всего обработано" class="leading-3" font-size="12px" />
          <TCol title="Оставил не закрытыми" class="leading-3" font-size="12px" />
          <TCol title="Дней в работе" class="leading-3" font-size="12px" />
          <TCol title="Общая конверсия" class="leading-3" font-size="12px" />
          <TCol title="Брак" class="leading-3" font-size="12px" />
          <TCol title="Успех" class="leading-3" font-size="12px" />
          <TCol title="% Успех" class="leading-3" font-size="12px" />
          <!-- Звонки Лиды -->
          <TCol title="С прошлого периода" class="leading-3" font-size="12px" />
          <TCol title="Новые" class="leading-3" font-size="12px" />
          <TCol title="В работе" class="leading-3" font-size="12px" />
          <TCol title="Потенциал" class="leading-3" font-size="12px" />
          <TCol title="С движениями по стадиям" class="leading-3" font-size="12px" />
          <TCol title="Без движения по стадиям" class="leading-3" font-size="12px" />
          <TCol title="Сделки с отказом" class="leading-3" font-size="12px" />
          <TCol title="Потеряно" class="leading-3" font-size="12px" />
          <TCol title="Цикл отказа" class="leading-3" font-size="12px" />
          <TCol title="Успешные продажи" class="leading-3" font-size="12px" />
          <TCol title="Выручка" class="leading-3" font-size="12px" />
          <TCol title="Средний чек" class="leading-3" font-size="12px" />
          <TCol title="Цикл продажи" class="leading-3" font-size="12px" />
          <TCol title="Доведено до конца" class="leading-3" font-size="12px" />
          <TCol title="Оставил не закрытыми" class="leading-3" font-size="12px" />
          <TCol title="Длительность не закрытых" class="leading-3" font-size="12px" />
          <TCol title="Общая конверсия" class="leading-3" font-size="12px" />
          <TCol title="Конверсия в отказ" class="leading-3" font-size="12px" />
          <TCol title="Конверсия в продажу" class="leading-3" font-size="12px" />
          <TCol title="Процент успеха" class="leading-3" font-size="12px" />
        </TRow>
      </thead>

      <tbody>
        <TRow v-if="isLoading">
          <TCell class="bg-white sticky-first-col" :colspan="48">
            Загрузка данных по отделу продаж…
          </TCell>
        </TRow>

        <TRow
          v-for="row in rows"
          v-else
          :key="row.userId"
          :user-id="row.userId"
        >
          <TCell class="bg-white sticky-first-col">
            <a
              :href="`//itsolutions.bitrix24.ru/company/personal/user/${row.userId}/`"
              target="_blank"
            >
              {{ getUserNameById(row.userId) }}
            </a>
          </TCell>

          <!-- Звонки входящие — пока без фактических расчётов -->
          <TCell :title="`${getUserNameById(row.userId)} - Пропущенные звонки`">
            {{ row.incomingMissed }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Успешные звонки за период`">
            {{ row.incomingAnswered }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Успешные звонки за период, с длительностью больше фильтра Результативные звонки`"
          >
            {{ row.incomingEffective }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Результативных от успешных`">
            {{ formatPercent(row.incomingEffectiveRate) }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Сумма времени всех входящих вызовов`"
            data-order="0"
          >
            {{ formatDuration(row.incomingDurationSec) }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Сумма времени всех результативных входящих вызовов`"
            data-order="0"
          >
            {{ formatDuration(row.incomingEffectiveDurationSec) }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Средняя длительность всех успешных входящих вызовов`"
            data-order="0"
          >
            {{ formatDuration(row.incomingAvgDurationSec) }}
          </TCell>

          <!-- Звонки исходящие — пока без фактических расчётов -->
          <TCell :title="`${getUserNameById(row.userId)} - Недозвон`">
            {{ row.outgoingMissed }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Успешные исходящие звонки за период`"
          >
            {{ row.outgoingAnswered }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Успешные звонки за период, с длительностью больше фильтра Результативные звонки`"
          >
            {{ row.outgoingEffective }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Результативных от успешных`">
            {{ formatPercent(row.outgoingEffectiveRate) }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сумма времени всех исходящих вызовов`">
            {{ formatDuration(row.outgoingDurationSec) }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Сумма времени всех результативных исходящих вызовов`"
            data-order="0"
          >
            {{ formatDuration(row.outgoingEffectiveDurationSec) }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Средняя длительность всех успешных исходящих вызовов`"
          >
            {{ formatDuration(row.outgoingAvgDurationSec) }}
          </TCell>

          <!-- Лиды -->
          <TCell
            :title="`${getUserNameById(row.userId)} - Лиды - C прошлого периода`"
          >
            {{ row.leadsFromPrevious }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Созданные за период`">
            {{ row.leadsNew }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Всего в работе`">
            {{ row.leadsInWorkAtStart }}
          </TCell>

          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Смена стадий`"> 0 </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Без смены стадий`"> 0 </TCell>

          <TCell
            :title="`${getUserNameById(row.userId)} - Лиды - Брак`"
            class="L dt-type-numeric"
            data-key="L_B"
          >
            0
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Среднее время жизни бракованных лидов`">
            0дн.
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Рабочие`"> 0 </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Среднее время жизни успешных лидов`">
            0дн.
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Завершённые`"> 0 </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Лиды - Не закрытые до 08.02.2026`"
          >
            0
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Среднее время жизни незакрытых лидов`">
            0дн.
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Конверсия Всего`"> 0.00% </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Конверсия Брак`"> 0.00% </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Конверсия Успешно`"> 0.00% </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Лиды - Доля успешных`"> 0.00% </TCell>

          <!-- Сделки -->
          <TCell
            :title="`${getUserNameById(row.userId)} - Сделок не завершенных с прошлых периодов`"
          >
            {{ row.dealsFromPrevious }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделок начатых за период`">
            {{ row.dealsNew }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделок в работе`">
            {{ row.dealsInWorkAtStart }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Потенциал (сумма сделок в работе)`">
            0
          </TCell>

          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Смена стадий`"> 0 </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Без смены стадий`"> 0 </TCell>

          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Не продал`">
            {{ row.dealsLost }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Потеряно (сумма проваленных сделок)`">
            0
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Среднее время жизни проигранных сделок`">
            0дн.
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Продал`">
            {{ row.dealsWon }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Выручка (сумма по успешным сделкам)`">
            {{ row.revenue.toFixed(2) }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Средний чек (по успешным сделкам)`">
            {{ row.avgCheck.toFixed(2) }}
          </TCell>

          <TCell :title="`${getUserNameById(row.userId)} - Среднее время жизни успешных сделок`">
            {{ Math.round(row.saleCycleDays) }}дн.
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Завершённые`">
            {{ row.finishedCount }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Не закрытые до 08.02.2026`">
            {{ row.notFinishedCount }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Среднее время жизни незакрытых сделок`">
            {{ Math.round(row.notFinishedAvgDays) }}дн.
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Конверсия Всего`">
            {{ formatPercent(row.totalConversion) }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Конверсия Брак`">
            {{ formatPercent(row.lostConversion) }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Конверсия Успешно`">
            {{ formatPercent(row.wonConversion) }}
          </TCell>
          <TCell :title="`${getUserNameById(row.userId)} - Сделки - Доля успешных`">
            {{ formatPercent(row.successShare) }}
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Сделки в стадии Общая: - Переговоры в процессе`"
          >
            0
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Сделки в стадии разработка сайтов: - Новая`"
          >
            0
          </TCell>
          <TCell
            :title="`${getUserNameById(row.userId)} - Сделки в стадии разработка сайтов: - В работе`"
          >
            0
          </TCell>
        </TRow>
      </tbody>
      <tfoot>
        <TRow class-name="row0" user-id="0">
          <TCell class="bg-white sticky-first-col"> ИТОГО </TCell>
          <TCell title="ИТОГО - Пропущенные звонки">
            {{ totals.incomingMissed }}
          </TCell>
          <TCell title="ИТОГО - Успешные звонки за период">
            {{ totals.incomingAnswered }}
          </TCell>
          <TCell
            title="ИТОГО - Успешные звонки за период, с длительностью больше фильтра Результативные звонки"
          >
            {{ totals.incomingEffective }}
          </TCell>
          <TCell title="ИТОГО - Результативных от успешных">
            {{ formatPercent(totalsIncomingRate) }}
          </TCell>
          <TCell title="ИТОГО - Сумма времени всех входящих вызовов">
            {{ formatDuration(totals.incomingDurationSec) }}
          </TCell>
          <TCell title="ИТОГО - Сумма времени всех результативных входящих вызовов">
            {{ formatDuration(totals.incomingEffectiveDurationSec) }}
          </TCell>
          <TCell title="ИТОГО - Средняя длительность всех успешных входящих вызовов">
            {{ formatDuration(totalsIncomingAvgDuration) }}
          </TCell>
          <TCell title="ИТОГО - Недозвон">
            {{ totals.outgoingMissed }}
          </TCell>
          <TCell title="ИТОГО - Успешные исходящие звонки за период">
            {{ totals.outgoingAnswered }}
          </TCell>
          <TCell
            title="ИТОГО - Успешные звонки за период, с длительностью больше фильтра Результативные звонки"
          >
            {{ totals.outgoingEffective }}
          </TCell>
          <TCell title="ИТОГО - Результативных от успешных">
            {{ formatPercent(totalsOutgoingRate) }}
          </TCell>
          <TCell title="ИТОГО - Сумма времени всех исходящих вызовов">
            {{ formatDuration(totals.outgoingDurationSec) }}
          </TCell>
          <TCell title="ИТОГО - Сумма времени всех результативных исходящих вызовов">
            {{ formatDuration(totals.outgoingEffectiveDurationSec) }}
          </TCell>
          <TCell title="ИТОГО - Средняя длительность всех успешных исходящих вызовов">
            {{ formatDuration(totalsOutgoingAvgDuration) }}
          </TCell>
          <TCell title="ИТОГО - Лиды - C прошлого периода">
            {{ totals.leadsFromPrevious }}
          </TCell>
          <TCell title="ИТОГО - Лиды - Созданные за период">
            {{ totals.leadsNew }}
          </TCell>
          <TCell title="ИТОГО - Лиды - Всего в работе">
            {{ totals.leadsInWorkAtStart }}
          </TCell>
          <TCell title="ИТОГО - Лиды - Смена стадий"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Без смены стадий"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Брак"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни бракованных лидов"> 0дн. </TCell>
          <TCell title="ИТОГО - Лиды - Рабочие"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни успешных лидов"> 0дн. </TCell>
          <TCell title="ИТОГО - Лиды - Завершённые"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Не закрытые до 08.02.2026"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни незакрытых лидов"> 0дн. </TCell>
          <TCell title="ИТОГО - Лиды - Конверсия Всего"> 0.00% </TCell>
          <TCell title="ИТОГО - Лиды - Конверсия Брак"> 0.00% </TCell>
          <TCell title="ИТОГО - Лиды - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="ИТОГО - Лиды - Доля успешных"> 0.00% </TCell>
          <TCell title="ИТОГО - Сделок не завершенных с прошлых периодов">
            {{ totals.dealsFromPrevious }}
          </TCell>
          <TCell title="ИТОГО - Сделок начатых за период">
            {{ totals.dealsNew }}
          </TCell>
          <TCell title="ИТОГО - Сделок в работе">
            {{ totals.dealsInWorkAtStart }}
          </TCell>
          <TCell title="ИТОГО - Потенциал (сумма сделок в работе)"> 0.00 </TCell>
          <TCell title="ИТОГО - Сделки - Смена стадий"> 0 </TCell>
          <TCell title="ИТОГО - Сделки - Без смены стадий"> 0 </TCell>
          <TCell title="ИТОГО - Сделки - Не продал">
            {{ totals.dealsLost }}
          </TCell>
          <TCell title="ИТОГО - Потеряно (сумма проваленных сделок)"> 0.00 </TCell>
          <TCell title="ИТОГО - Среднее время жизни проигранных сделок"> 0дн. </TCell>
          <TCell title="ИТОГО - Сделки - Продал">
            {{ totals.dealsWon }}
          </TCell>
          <TCell title="ИТОГО - Выручка (сумма по успешным сделкам)">
            {{ totals.revenue.toFixed(2) }}
          </TCell>
          <TCell title="ИТОГО - Средний чек (по успешным сделкам)">
            {{ totalsAvgCheck.toFixed(2) }}
          </TCell>
          <TCell title="ИТОГО - Среднее время жизни успешных сделок">
            {{ Math.round(totalsSaleCycleDays) }}дн.
          </TCell>
          <TCell title="ИТОГО - Сделки - Завершённые">
            {{ totals.finishedCount }}
          </TCell>
          <TCell title="ИТОГО - Сделки - Не закрытые до 08.02.2026">
            {{ totals.notFinishedCount }}
          </TCell>
          <TCell title="ИТОГО - Среднее время жизни незакрытых сделок">
            {{ Math.round(totalsNotFinishedAvgDays) }}дн.
          </TCell>
          <TCell title="ИТОГО - Сделки - Конверсия Всего">
            {{ formatPercent(totals.totalConversion / (rows.length || 1)) }}
          </TCell>
          <TCell title="ИТОГО - Сделки - Конверсия Брак">
            {{ formatPercent(totals.lostConversion / (rows.length || 1)) }}
          </TCell>
          <TCell title="ИТОГО - Сделки - Конверсия Успешно">
            {{ formatPercent(totals.wonConversion / (rows.length || 1)) }}
          </TCell>
          <TCell title="ИТОГО - Сделки - Доля успешных">
            {{ formatPercent(totals.successShare / (rows.length || 1)) }}
          </TCell>
        </TRow>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.dt-scroll {
  width: 100%;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: max-content;
  table-layout: fixed;
}

.report-table-scroll {
  padding-bottom: 16px;
}

td,
th {
  border: 1px solid #dee2e6;
  width: 120px;
  max-width: 120px;
  padding: 4px 8px;
  box-sizing: border-box;
  overflow: hidden;
}

/* Толстые разделители между группами колонок:
   Менеджер | Входящие | Исходящие | Лиды | Сделки */
thead tr:nth-child(1) th:nth-child(2),
thead tr:nth-child(1) th:nth-child(3),
thead tr:nth-child(1) th:nth-child(4),
thead tr:nth-child(1) th:nth-child(5) {
  border-left: 3px solid #aeb7c2;
}

thead tr:nth-child(2) th:nth-child(2),
thead tr:nth-child(2) th:nth-child(9),
thead tr:nth-child(2) th:nth-child(16),
thead tr:nth-child(2) th:nth-child(32),
tbody tr td:nth-child(2),
tbody tr td:nth-child(9),
tbody tr td:nth-child(16),
tbody tr td:nth-child(32),
tfoot tr td:nth-child(2),
tfoot tr td:nth-child(9),
tfoot tr td:nth-child(16),
tfoot tr td:nth-child(32) {
  border-left: 3px solid #aeb7c2;
}

thead tr th:first-child,
tbody tr td:first-child,
tfoot tr td:first-child {
  width: 160px;
  max-width: 160px;
}

th {
  white-space: normal;
  text-overflow: unset;
}

.sticky-first-col {
  position: sticky;
  left: 0;
  z-index: 2;
}

thead .sticky-first-col,
tfoot .sticky-first-col {
  z-index: 3;
}

thead tr:nth-child(1) th:first-child,
thead tr:nth-child(2) th:first-child {
  position: sticky;
  left: 0;
  z-index: 4;
  background: #ffffff;
}
</style>
