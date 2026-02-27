import { useCallsStoreRefs, useCallsStore } from '@/stores/calls'

/**
 * Обёртка над calls-стором для удобного доступа во вьюхах.
 * Все запросы и слежение за диапазоном дат живут в `useCallsStore`.
 */
export function useAnalyticsCalls() {
  const store = useCallsStore()
  const { calls, loading, error } = useCallsStoreRefs()

  if (!store.loadedRangeKey) {
    void store.fetchCalls()
  }

  return { calls, loading, error, fetchCalls: store.fetchCalls }
}
