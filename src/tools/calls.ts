export type Call = {
  id: string
  userId: string
  time: string
  date: string
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
  /** Идентификатор расшифровки звонка (Bitrix TRANSCRIPT_ID) */
  transcriptId?: string | null
  /** Расшифровка в обработке: Y/N */
  transcriptPending?: string | null
}

/**
 * Маппинг типов звонков для фильтрации.
 * CALL_TYPE согласно документации Bitrix24:
 * 1 — исходящий
 * 2 — входящий
 * 3 — входящий с перенаправлением на мобильный или стационарный телефон
 * 4 — обратный звонок
 */
const callTypeMap: Record<string, string[]> = {
  'исходящие': ['Исходящий'],
  'входящие': ['Входящий'],
  'пропущенные': ['Пропущенный'],
  'обратные': ['Обратный'],
}

/** Запись звонка из API телефонии (voximplant.statistic.get) */
type TelephonyRecord = Record<string, unknown>

function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  return `${String(h).padStart(2, '0')}:${String((m % 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function parseDateFromApi(raw: unknown): string {
  const str = String(raw ?? '')
  if (!str) return '—'
  const date = new Date(str)
  if (Number.isNaN(date.getTime())) return str.slice(0, 10)
  return date.toLocaleDateString('ru-RU')
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
  const callTypeRaw = record.CALL_TYPE ?? record.callType ?? record.TYPE ?? record.type
  const callTypeNum = Number(callTypeRaw)
  const durationSec = Number(record.CALL_DURATION ?? record.DURATION ?? record.duration ?? 0)
  const failedCode = String(record.CALL_FAILED_CODE ?? record.call_failed_code ?? '').trim()
  const isMissed = durationSec <= 0 || (failedCode !== '' && failedCode !== '200')
  // CALL_TYPE: 1=исходящий, 2=входящий, 3=входящий с перенаправлением, 4=обратный звонок
  let typeLabel: string
  if (callTypeNum === 1) {
    typeLabel = 'Исходящий'
  } else if (callTypeNum === 4 && !isMissed) {
    typeLabel = 'Обратный'
  } else {
    typeLabel = isMissed ? 'Пропущенный' : 'Входящий'
  }
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
  const transcriptIdRaw = record.TRANSCRIPT_ID ?? record.transcript_id
  const transcriptId = typeof transcriptIdRaw === 'string' ? transcriptIdRaw.trim() || undefined : undefined
  const transcriptPendingRaw = record.TRANSCRIPT_PENDING ?? record.transcript_pending
  const transcriptPending = typeof transcriptPendingRaw === 'string' ? transcriptPendingRaw : undefined
  const startRaw = record.CALL_START_DATE ?? record.call_start_date
  return {
    id,
    userId,
    time: parseTimeFromApi(startRaw),
    date: parseDateFromApi(startRaw),
    number: String(record.PHONE_NUMBER ?? record.phone_number ?? record.PHONE_NUMBER_FROM ?? record.PHONE_NUMBER_TO ?? '—'),
    type: typeLabel,
    duration: formatDuration(durationSec),
    status: isMissed ? 'Не отвечен' : 'Завершен',
    crm: crmFallback,
    crmEntityType,
    crmEntityId,
    hasRecording,
    recordingUrl: hasRecording && recordingUrl ? recordingUrl.trim() : undefined,
    transcriptId: transcriptId ?? null,
    transcriptPending: transcriptPending ?? null,
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
