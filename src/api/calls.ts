import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

export type TelephonyCallRecord = Record<string, unknown>

/**
 * Стандартный набор полей для выборки звонков из voximplant.statistic.get
 * Согласно документации: https://dev.1c-bitrix.ru/rest_help/telephony/voximplant_statistic_get.php
 */
export const DEFAULT_CALL_SELECT_FIELDS = [
  'ID',
  'CALL_ID',
  'CALL_TYPE',
  'CALL_FAILED_CODE',
  'CALL_FAILED_REASON',
  'CALL_DURATION',
  'PORTAL_USER_ID',
  'PHONE_NUMBER',
  'CALL_START_DATE',
  'CRM_ENTITY_ID',
  'CRM_ENTITY_TYPE',
  'CALL_RECORD_URL',
  'TRANSCRIPT_ID',
  'TRANSCRIPT_PENDING',
] as const

/**
 * Типы звонков согласно документации Bitrix24:
 * 1 - исходящий
 * 2 - входящий
 * 3 - входящий с перенаправлением на мобильный или стационарный телефон
 * 4 - обратный звонок
 */
export const CALL_TYPE = {
  OUTGOING: 1,
  INCOMING: 2,
  INCOMING_REDIRECTED: 3,
  CALLBACK: 4,
} as const

/**
 * Проверяет, является ли звонок исходящим
 */
export const isOutgoingCallType = (callType: number | string | unknown): boolean => {
  return Number(callType) === CALL_TYPE.OUTGOING
}

/**
 * Проверяет, является ли звонок входящим (обычный или с перенаправлением)
 */
export const isIncomingCallType = (callType: number | string | unknown): boolean => {
  const type = Number(callType)
  return type === CALL_TYPE.INCOMING || type === CALL_TYPE.INCOMING_REDIRECTED
}

/**
 * Проверяет, является ли звонок обратным (CALLBACK)
 */
export const isCallbackCallType = (callType: number | string | unknown): boolean => {
  return Number(callType) === CALL_TYPE.CALLBACK
}

/**
 * Проверяет, является ли звонок пропущенным (не отвечен или ошибка).
 * CALL_FAILED_CODE "200" = успешный звонок (ответили); иные коды или нулевая длительность = пропущен.
 */
export const isMissedCall = (record: TelephonyCallRecord): boolean => {
  const duration = Number(record.CALL_DURATION ?? record.DURATION ?? record.duration ?? 0)
  if (duration <= 0) return true
  const failedCode = String(record.CALL_FAILED_CODE ?? record.call_failed_code ?? '').trim()
  return failedCode !== '' && failedCode !== '200'
}

type CallListParams = {
  /** FILTER по документации: поля для фильтрации, например { ">=CALL_START_DATE": "2025-01-01T00:00:00+03:00", "<=CALL_START_DATE": "2025-01-31T23:59:59+03:00", "PORTAL_USER_ID": "123" } */
  filter?: Record<string, unknown>
  /** SELECT - массив полей для выборки. По умолчанию выбираются все необходимые поля. */
  select?: string[]
  /** Поле сортировки (CALL_START_DATE, CALL_DURATION и т.д.) */
  sort?: string
  /** Порядок: ASC или DESC */
  order?: 'asc' | 'desc' | 'ASC' | 'DESC'
}

/**
 * Получить список звонков из телефонии.
 * Документация: https://dev.1c-bitrix.ru/rest_help/telephony/voximplant_statistic_get.php
 * Параметры: FILTER (поля фильтрации), SELECT (массив полей), SORT, ORDER. Даты в FILTER — в формате ISO-8601.
 */
export const telephonyCallList = async ({
  filter = {},
  select = [...DEFAULT_CALL_SELECT_FIELDS],
  sort = 'CALL_START_DATE',
  order = 'DESC',
}: CallListParams = {}): Promise<TelephonyCallRecord[]> => {
  const b24 = await useB24()
  try {
    const params: Record<string, unknown> = {
      FILTER: filter,
      SELECT: select,
      SORT: sort,
      ORDER: order,
    }
    const response: unknown = await callMethodPromise(b24, 'voximplant.statistic.get', params)
    const answer = response as { result?: TelephonyCallRecord[] }
    return Array.isArray(answer?.result) ? answer.result : []
  } catch (error) {
    console.error('voximplant.statistic.get error:', error)
    return []
  }
}

/** Сообщение расшифровки звонка для telephony.call.attachTranscription */
export type TranscriptMessage = {
  /** Участник: "User" — пользователь портала, "Client" — внешний участник */
  SIDE: 'User' | 'Client'
  /** Время начала фразы в секундах от начала разговора */
  START_TIME: number
  /** Время окончания фразы в секундах от начала разговора */
  STOP_TIME: number
  /** Текст фразы */
  MESSAGE: string
}

export type AttachTranscriptionParams = {
  /** Идентификатор звонка (CALL_ID) */
  callId: string
  /** Массив реплик расшифровки */
  messages: TranscriptMessage[]
  /** Стоимость расшифровки (опционально) */
  cost?: number
  /** Валюта стоимости (опционально) */
  costCurrency?: string
}

/**
 * Добавить расшифровку записи к звонку.
 * Документация: https://apidocs.bitrix24.ru/api-reference/telephony/telephony-call-attach-transcription.html
 */
export const telephonyCallAttachTranscription = async (
  params: AttachTranscriptionParams
): Promise<boolean> => {
  const b24 = await useB24()
  try {
    const body: Record<string, unknown> = {
      CALL_ID: params.callId,
      MESSAGES: params.messages.map((m) => ({
        SIDE: m.SIDE,
        START_TIME: Number(m.START_TIME),
        STOP_TIME: Number(m.STOP_TIME),
        MESSAGE: String(m.MESSAGE ?? '').trim() || '',
      })),
    }
    if (params.cost != null) body.COST = params.cost
    if (params.costCurrency != null) body.COST_CURRENCY = params.costCurrency
    const response: unknown = await callMethodPromise(b24, 'telephony.call.attachTranscription', body)
    const answer = response as { result?: unknown; error?: string }
    if (answer?.error) {
      console.error('telephony.call.attachTranscription error:', answer.error)
      return false
    }
    return true
  } catch (error) {
    console.error('telephony.call.attachTranscription error:', error)
    return false
  }
}

/** Один элемент расшифровки (реплика) из ответа API */
export type TranscriptMessageItem = {
  SIDE?: string
  START_TIME?: number
  STOP_TIME?: number
  MESSAGE?: string
}

/** Результат получения расшифровки звонка */
export type CallTranscriptionResult = {
  messages: TranscriptMessageItem[]
  pending?: boolean
}

/**
 * Получить расшифровку звонка по CALL_ID или TRANSCRIPT_ID.
 * Пробует voximplant.transcript.get (TRANSCRIPT_ID) и при отсутствии метода возвращает пустой результат.
 */
export const telephonyCallGetTranscription = async (
  callId: string,
  transcriptId?: string | null
): Promise<CallTranscriptionResult> => {
  if (!transcriptId || String(transcriptId).trim() === '') {
    return { messages: [] }
  }
  const b24 = await useB24()
  try {
    const response: unknown = await callMethodPromise(b24, 'voximplant.transcript.get', {
      id: String(transcriptId).trim(),
    })
    const data = response as { result?: { MESSAGES?: TranscriptMessageItem[] }; error?: string }
    if (data?.error) return { messages: [] }
    const messages = Array.isArray(data?.result?.MESSAGES) ? data.result.MESSAGES : []
    return { messages }
  } catch {
    return { messages: [] }
  }
}
