import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { REPORT_MODES, type ReportModeId } from '@/types/reportMode'

export const useReportFiltersStore = defineStore('reportFilters', () => {
  const reportMode = ref<ReportModeId>('sales_department')
  const selectedUserIds = ref<string[]>([])
  const selectedDealDirections = ref<string[]>([])
  const excludedStages = ref<string[]>([])
  const touchesDays = ref(7)
  const touchesMonths = ref(7)
  const considerResponsible = ref(true)
  const groupingPeriod = ref<'days' | 'months'>('months')
  const hideCallsSection = ref(false)
  const hideLeadsSection = ref(false)
  const hideDealsSection = ref(false)
  const minCallDurationSeconds = ref(5)
  const groupingField = ref('UTM_SOURCE')
  const onlySuccessfulCallbacks = ref(false)
  const successfulCallbackMinSeconds = ref(5)
  const refreshToken = ref(0)

  const reportModeLabel = computed(() => {
    const mode = REPORT_MODES.find((m) => m.id === reportMode.value)
    return mode?.label ?? ''
  })

  return {
    reportMode,
    reportModeLabel,
    selectedUserIds,
    selectedDealDirections,
    excludedStages,
    touchesDays,
    touchesMonths,
    considerResponsible,
    groupingPeriod,
    hideCallsSection,
    hideLeadsSection,
    hideDealsSection,
    minCallDurationSeconds,
    groupingField,
    onlySuccessfulCallbacks,
    successfulCallbackMinSeconds,
    refreshToken,
  }
})

export const useReportFiltersStoreRefs = () => storeToRefs(useReportFiltersStore())
