<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CardComponent from '@/components/element/card/CardComponent.vue'
import { useChartData } from '@/composables/useChartData'
import type { TelephonyCallRecord } from '@/api/calls'

const props = defineProps<{
  calls?: TelephonyCallRecord[]
}>()

const callsRef = computed(() => props.calls ?? [])

const { pieSeries, pieOptions } = useChartData(callsRef)
</script>

<template>
  <B24Card class="">
    <template #header>
      <div class="flex items-center justify-between">
        <p>Соотношение по типам</p>
      </div>
    </template>

    <VueApexCharts :options="pieOptions" :series="pieSeries" height="260" />
  </B24Card>
</template>
