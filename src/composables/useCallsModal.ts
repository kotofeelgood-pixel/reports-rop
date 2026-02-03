import { ref } from 'vue'
import type { Call } from '@/tools/calls'
import { getCallsForUser, getAllCalls } from '@/tools/calls'

type User = {
  id: string
  name: string
}

/**
 * Композабл для управления модальным окном звонков
 * @param users - массив пользователей для получения звонков
 * @returns объект с состоянием модального окна и методами для работы с ним
 */
export function useCallsModal(users: { value: User[] }) {
  const isCallsModalOpen = ref(false)
  const selectedUserName = ref('')
  const selectedCallType = ref('')
  const selectedCalls = ref<Call[]>([])

  const openCallsModal = (userId: string, userName: string, callType: string) => {
    selectedUserName.value = userName
    selectedCallType.value = callType
    selectedCalls.value = getCallsForUser(userId, callType, users.value)
    isCallsModalOpen.value = true
  }

  const openTotalsCallsModal = (callType: string) => {
    selectedUserName.value = 'Все сотрудники'
    selectedCallType.value = callType
    selectedCalls.value = getAllCalls(callType, users.value)
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
