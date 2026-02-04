import type { Ref } from 'vue'
import { ref } from 'vue'
import type { Call } from '@/tools/calls'
import { getCallsFromTelephonyRecords } from '@/tools/calls'
import type { TelephonyCallRecord } from '@/api/calls'

/**
 * Композабл для управления модальным окном звонков.
 * Использует реальные данные из API телефонии.
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
    openCallsModal,
    openTotalsCallsModal,
  }
}
