export type Call = {
  id: string
  userId: string
  time: string
  number: string
  type: string
  duration: string
  status: string
  crm: string
  /** Тип сущности CRM (CONTACT, LEAD, COMPANY) для подгрузки имени из Битрикс */
  crmEntityType?: string
  /** ID сущности CRM для подгрузки имени из Битрикс */
  crmEntityId?: string
  hasRecording: boolean
  /** URL записи разговора для воспроизведения */
  recordingUrl?: string | null
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

/** Запись звонка из API телефонии (voximplant.statistic.get) */
type TelephonyRecord = Record<string, unknown>

function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  return `${String(h).padStart(2, '0')}:${String((m % 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function parseTimeFromApi(raw: unknown): string {
  const str = String(raw ?? '')
  if (!str) return '—'
  const date = new Date(str)
  if (Number.isNaN(date.getTime())) return str.slice(0, 8)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}

/**
 * Преобразует запись из API телефонии в тип Call.
 * Поддерживает поля: CALL_ID, CALL_START_DATE, PHONE_NUMBER, CALL_TYPE, CALL_DURATION,
 * CALL_FAILED_CODE, PORTAL_USER_ID, CALL_RECORD_URL, RECORD_FILE_ID, CRM_ENTITY_TYPE, CRM_ENTITY_ID и др.
 */
export function telephonyRecordToCall(
  record: TelephonyRecord,
  index: number,
  usersById: Map<string, { name: string }>
): Call {
  const userId = String(record.PORTAL_USER_ID ?? record.USER_ID ?? record.RESPONSIBLE_ID ?? record.ASSIGNED_BY_ID ?? '').trim()
  const callTypeNum = Number(record.CALL_TYPE ?? record.callType ?? record.TYPE ?? record.type)
  const durationSec = Number(record.CALL_DURATION ?? record.DURATION ?? record.duration ?? 0)
  const failedCode = String(record.CALL_FAILED_CODE ?? record.call_failed_code ?? '').trim()
  const isMissed = durationSec <= 0 || (failedCode !== '' && failedCode !== '200')
  const typeLabel = callTypeNum === 1 ? 'Исходящий' : isMissed ? 'Пропущенный' : 'Входящий'
  const recordingUrlRaw = record.CALL_RECORD_URL ?? record.RECORDING_URL ?? record.RECORDING_LINK ?? record.record_url ?? record.recording_url
  const recordingUrl = typeof recordingUrlRaw === 'string' ? recordingUrlRaw : undefined
  const hasRecording = Boolean(recordingUrl && recordingUrl.trim())
  const id = String(record.CALL_ID ?? record.ID ?? record.id ?? `call-${index}`)
  const crmEntityTypeRaw = String(record.CRM_ENTITY_TYPE ?? record.crm_entity_type ?? '').trim() || undefined
  const crmEntityType = crmEntityTypeRaw ? crmEntityTypeRaw.toUpperCase() : undefined
  const crmEntityId = String(record.CRM_ENTITY_ID ?? record.crm_entity_id ?? '').trim() || undefined
  const crmFallback =
    String(record.CRM_ENTITY_TITLE ?? record.crm_entity_title ?? record.CONTACT_NAME ?? '').trim() ||
    (crmEntityType === 'CONTACT' ? 'Контакт' : crmEntityType === 'LEAD' ? 'Лид' : crmEntityType === 'COMPANY' ? 'Компания' : '—') ||
    '—'
  return {
    id,
    userId,
    time: parseTimeFromApi(record.CALL_START_DATE ?? record.call_start_date),
    number: String(record.PHONE_NUMBER ?? record.phone_number ?? record.PHONE_NUMBER_FROM ?? record.PHONE_NUMBER_TO ?? '—'),
    type: typeLabel,
    duration: formatDuration(durationSec),
    status: isMissed ? 'Не отвечен' : 'Завершен',
    crm: crmFallback,
    crmEntityType,
    crmEntityId,
    hasRecording,
    recordingUrl: hasRecording && recordingUrl ? recordingUrl.trim() : undefined,
  }
}

/**
 * Фильтрует массив записей API по пользователю и типу звонков, возвращает Call[].
 */
export function getCallsFromTelephonyRecords(
  records: TelephonyRecord[],
  usersById: Map<string, { name: string }>,
  userId: string | null,
  callType: string
): Call[] {
  const allowedTypes = callTypeMap[callType.toLowerCase()] || []
  const mapped = records.map((r, i) => telephonyRecordToCall(r, i, usersById))
  return mapped.filter(call => {
    if (userId != null && call.userId !== userId) return false
    return allowedTypes.includes(call.type)
  })
}
