import { onMounted, ref, watch } from 'vue'
import { useDateRange } from '@/composables/useDateRange'
import { telephonyCallList, type TelephonyCallRecord } from '@/api/calls'

/**
 * Загрузка звонков за выбранный период для экрана аналитики.
 * Использует тот же диапазон дат, что и отчёт (reportSettings).
 */
export function useAnalyticsCalls() {
  const { getDateRange, formatB24DateFilter, dateRange, dateValue } = useDateRange()
  const calls = ref<TelephonyCallRecord[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCalls = async () => {
    const range = getDateRange()
    if (!range?.start || !range?.end) {
      calls.value = []
      return
    }
    loading.value = true
    error.value = null
    try {
      const filter: Record<string, unknown> = {
        '>=CALL_START_DATE': formatB24DateFilter(range.start, 'start'),
        '<=CALL_START_DATE': formatB24DateFilter(range.end, 'end'),
      }
      const data = await telephonyCallList({ filter, sort: 'CALL_START_DATE', order: 'DESC' })
      calls.value = Array.isArray(data) ? data : []
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      calls.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    void fetchCalls()
  })

  watch([dateRange, dateValue], () => {
    void fetchCalls()
  }, { deep: true })

  return { calls, loading, error, fetchCalls }
}
