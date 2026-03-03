<script setup lang="ts">
import { computed, ref } from 'vue'

type Row = {
  utm: string
  leadsFromPrev: number
  leadsNew: number
  leadsInWork: number
  dealsFromPrev: number
  dealsNew: number
  dealsInWork: number
}

const rows = ref<Row[]>([
  {
    utm: 'yandex',
    leadsFromPrev: 0,
    leadsNew: 0,
    leadsInWork: 0,
    dealsFromPrev: 11,
    dealsNew: 0,
    dealsInWork: 11,
  },
  {
    utm: '-Не заполнено-',
    leadsFromPrev: 314,
    leadsNew: 0,
    leadsInWork: 314,
    dealsFromPrev: 85,
    dealsNew: 0,
    dealsInWork: 85,
  },
])

const totalRow = computed(() => {
  return rows.value.reduce(
    (acc, row) => {
      acc.leadsFromPrev += row.leadsFromPrev
      acc.leadsNew += row.leadsNew
      acc.leadsInWork += row.leadsInWork
      acc.dealsFromPrev += row.dealsFromPrev
      acc.dealsNew += row.dealsNew
      acc.dealsInWork += row.dealsInWork
      return acc
    },
    {
      utm: 'ИТОГО',
      leadsFromPrev: 0,
      leadsNew: 0,
      leadsInWork: 0,
      dealsFromPrev: 0,
      dealsNew: 0,
      dealsInWork: 0,
    },
  )
})

const tableData = computed(() => [...rows.value, totalRow.value])

const headerTitle = 'UTM отчёт по источникам'
</script>

<template>
  <div class="space-y-3 h-full flex flex-col">
    <div class="text-lg font-semibold">
      {{ headerTitle }}
    </div>

    <B24Table :data="tableData" class="flex-1" />
  </div>
</template>
