<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CardComponent from '@/components/element/card/CardComponent.vue'
import { useChartData } from '@/composables/useChartData'
import type { TelephonyCallRecord } from '@/api/calls'

const props = defineProps<{
  calls?: TelephonyCallRecord[]
}>()

const colors = ['#4ade80', '#2fc6f6', '#ef4444', '#f97316']

const callsRef = computed(() => props.calls ?? [])

const { series, chartOptions } = useChartData(callsRef)
</script>

<template>
  <B24Card class="">
    <template #header>
      <div class="flex items-center justify-between">
        <p>График</p>
        <ul class="flex items-center gap-2 text-xs">
          <li
            v-for="(value, index) in series"
            :key="index"
            class="flex items-center gap-1.5 py-0.5 px-2 rounded-md text-white text-xs"
            :style="{ backgroundColor: colors[index] }"
          >
            {{ value.name }}
          </li>
        </ul>
      </div>
    </template>

    <VueApexCharts :options="chartOptions" :series="series" height="220" />
  </B24Card>
</template>
