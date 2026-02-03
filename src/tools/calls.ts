export type Call = {
  id: string
  userId: string
  time: string
  number: string
  type: string
  duration: string
  status: string
  crm: string
  hasRecording: boolean
}

type User = {
  id: string
  name: string
}

/**
 * Генерирует тестовые данные звонков
 * @param users - массив пользователей для распределения звонков
 * @returns массив тестовых звонков
 */
export function generateTestCalls(users: User[]): Call[] {
  if (users.length === 0) return []

  // Распределяем звонки циклически по пользователям
  const calls: Call[] = [
    {
      id: '1',
      userId: users[0 % users.length]?.id || '',
      time: '09:15:32',
      number: '79161234567',
      type: 'Исходящий',
      duration: '00:03:45',
      status: 'Завершен',
      crm: 'Иван Петров',
      hasRecording: true,
    },
    {
      id: '2',
      userId: users[0 % users.length]?.id || '',
      time: '10:22:18',
      number: '79267894561',
      type: 'Входящий',
      duration: '00:05:12',
      status: 'Завершен',
      crm: 'Мария Сидорова',
      hasRecording: true,
    },
    {
      id: '3',
      userId: users[1 % users.length]?.id || '',
      time: '11:20:19',
      number: '79640774400',
      type: 'Исходящий',
      duration: '00:00:00',
      status: 'Вызов отменен',
      crm: 'Евгений',
      hasRecording: false,
    },
    {
      id: '4',
      userId: users[1 % users.length]?.id || '',
      time: '12:45:08',
      number: '79151239876',
      type: 'Входящий',
      duration: '00:02:33',
      status: 'Завершен',
      crm: 'Алексей Козлов',
      hasRecording: true,
    },
    {
      id: '5',
      userId: users[0 % users.length]?.id || '',
      time: '13:10:55',
      number: '79039876543',
      type: 'Пропущенный',
      duration: '00:00:00',
      status: 'Не отвечен',
      crm: 'Ольга Смирнова',
      hasRecording: false,
    },
    {
      id: '6',
      userId: users[Math.min(2, users.length - 1) % users.length]?.id || '',
      time: '14:33:21',
      number: '79267771234',
      type: 'Исходящий',
      duration: '00:01:15',
      status: 'Завершен',
      crm: 'Дмитрий Волков',
      hasRecording: true,
    },
    {
      id: '7',
      userId: users[Math.min(2, users.length - 1) % users.length]?.id || '',
      time: '15:52:44',
      number: '79121234567',
      type: 'Входящий',
      duration: '00:04:28',
      status: 'Завершен',
      crm: 'Елена Новикова',
      hasRecording: true,
    },
  ]

  return calls
}

/**
 * Маппинг типов звонков для фильтрации
 */
const callTypeMap: Record<string, string[]> = {
  'исходящие': ['Исходящий'],
  'входящие': ['Входящий'],
  'пропущенные': ['Пропущенный'],
  'обработанные пропущенные': ['Обработанный пропущенный'],
}

/**
 * Получает звонки конкретного пользователя по типу
 * @param userId - ID пользователя
 * @param callType - тип звонка (исходящие, входящие, пропущенные, обработанные пропущенные)
 * @param users - массив пользователей для генерации тестовых данных
 * @returns отфильтрованный массив звонков
 */
export function getCallsForUser(userId: string, callType: string, users: User[]): Call[] {
  const allowedTypes = callTypeMap[callType.toLowerCase()] || []
  const allCalls = generateTestCalls(users)
  return allCalls.filter(call => call.userId === userId && allowedTypes.includes(call.type))
}

/**
 * Получает все звонки по типу (для всех сотрудников)
 * @param callType - тип звонка (исходящие, входящие, пропущенные, обработанные пропущенные)
 * @param users - массив пользователей для генерации тестовых данных
 * @returns отфильтрованный массив звонков
 */
export function getAllCalls(callType: string, users: User[]): Call[] {
  const allowedTypes = callTypeMap[callType.toLowerCase()] || []
  const allCalls = generateTestCalls(users)
  return allCalls.filter(call => allowedTypes.includes(call.type))
}
