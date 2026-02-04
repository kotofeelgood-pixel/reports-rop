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

/**
 * Маппинг типов звонков для фильтрации (по API: CALL_TYPE 1 — исходящий, 2/3 — входящий, пропущенный по длительности/коду).
 */
const callTypeMap: Record<string, string[]> = {
  'исходящие': ['Исходящий'],
  'входящие': ['Входящий'],
  'пропущенные': ['Пропущенный'],
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
