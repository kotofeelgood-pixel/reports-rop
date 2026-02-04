import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import type { Call } from '@/tools/calls'
import { getCallsFromTelephonyRecords } from '@/tools/calls'
import type { TelephonyCallRecord } from '@/api/calls'
import { getCrmEntityName } from '@/api/crm'

/**
 * Композабл для управления модальным окном звонков.
 * Использует реальные данные из API телефонии; подгружает имена контактов/лидов/компаний из CRM Битрикс.
 * @param apiCalls - массив звонков из voximplant.statistic.get
 * @param usersById - карта пользователей по id для отображения имён и CRM
 */
export function useCallsModal(
  apiCalls: Ref<TelephonyCallRecord[]>,
  usersById: Ref<Map<string, { name: string }>>
) {
  const isCallsModalOpen = ref(false)
  const selectedUserName = ref('')
  const selectedCallType = ref('')
  const selectedCalls = ref<Call[]>([])
  /** Кэш имён CRM: ключ "ENTITYTYPE_ID" (например CONTACT_1042), значение — отображаемое имя */
  const crmNames = ref<Map<string, string>>(new Map())

  watch(
    selectedCalls,
    async (calls) => {
      if (!calls?.length) {
        crmNames.value = new Map()
        return
      }
      const keys = new Set<string>()
      for (const c of calls) {
        if (c.crmEntityType && c.crmEntityId) {
          keys.add(`${c.crmEntityType}_${c.crmEntityId}`)
        }
      }
      if (keys.size === 0) {
        crmNames.value = new Map()
        return
      }
      const entries = await Promise.all(
        [...keys].map(async (key) => {
          const i = key.indexOf('_')
          const type = key.slice(0, i)
          const id = key.slice(i + 1)
          const name = await getCrmEntityName(type, id)
          return [key, name] as const
        })
      )
      crmNames.value = new Map(entries)
    },
    { immediate: true }
  )

  const openCallsModal = (userId: string, userName: string, callType: string) => {
    selectedUserName.value = userName
    selectedCallType.value = callType
    selectedCalls.value = getCallsFromTelephonyRecords(
      apiCalls.value,
      usersById.value,
      userId,
      callType
    )
    isCallsModalOpen.value = true
  }

  const openTotalsCallsModal = (callType: string) => {
    selectedUserName.value = 'Все сотрудники'
    selectedCallType.value = callType
    selectedCalls.value = getCallsFromTelephonyRecords(
      apiCalls.value,
      usersById.value,
      null,
      callType
    )
    isCallsModalOpen.value = true
  }

  return {
    isCallsModalOpen,
    selectedUserName,
    selectedCallType,
    selectedCalls,
    crmNames,
    openCallsModal,
    openTotalsCallsModal,
  }
}
