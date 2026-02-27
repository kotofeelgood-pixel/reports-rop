import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useDateRange } from '@/composables/useDateRange'
import { telephonyCallList, type TelephonyCallRecord } from '@/api/calls'

export const useCallsStore = defineStore('calls', () => {
  const calls = ref<TelephonyCallRecord[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const loadedRangeKey = ref<string | null>(null)

  const { getDateRange, formatB24DateFilter, dateRange, dateValue } = useDateRange()

  const buildRangeKey = () => {
    const range = getDateRange()
    if (!range?.start || !range?.end) return null
    const pad = (n: number) => String(n).padStart(2, '0')
    const s = range.start
    const e = range.end
    return [
      s.getFullYear(),
      pad(s.getMonth() + 1),
      pad(s.getDate()),
      e.getFullYear(),
      pad(e.getMonth() + 1),
      pad(e.getDate()),
    ].join('-')
  }

  const fetchCalls = async (opts?: { force?: boolean }) => {
    const force = Boolean(opts?.force)
    const range = getDateRange()
    if (!range?.start || !range?.end) {
      calls.value = []
      loadedRangeKey.value = null
      return
    }

    const key = buildRangeKey()
    if (!force && key && loadedRangeKey.value === key && calls.value.length) {
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
      loadedRangeKey.value = key
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e)
      calls.value = []
      loadedRangeKey.value = null
    } finally {
      loading.value = false
    }
  }

  watch(
    [dateRange, dateValue],
    () => {
      void fetchCalls()
    },
    { deep: true }
  )

  return {
    calls,
    loading,
    error,
    loadedRangeKey,
    fetchCalls,
  }
})

export const useCallsStoreRefs = () => storeToRefs(useCallsStore())

