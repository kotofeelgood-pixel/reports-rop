export const REPORT_MODES = [
  { id: 'sales_department', label: 'Отчет по отделу продаж', isNew: false },
  { id: 'sales_channels', label: 'Отчет по каналам продаж', isNew: false },
  { id: 'portfolio_b2b', label: 'Отчет по Портфелю В2В (по компаниям)', isNew: false },
  { id: 'portfolio_b2c', label: 'Отчет по Портфелю В2С (по контактам)', isNew: false },
  { id: 'conversions', label: 'Отчет по конверсиям', isNew: true },
  { id: 'conversions_short', label: 'Отчет по конверсиям (сокращённый)', isNew: true },
  { id: 'deal_movements', label: 'Отчет по движениям Сделок', isNew: true },
  { id: 'sales_activity', label: 'Отчет по активности в продажах', isNew: true },
  { id: 'company_touches_b2b', label: 'Отчет по касаниям Компаний (B2B)', isNew: true },
  { id: 'planned_tasks', label: 'Отчет по запланированным делам', isNew: true },
  { id: 'cohort_deals', label: 'Когортный анализ сделок', isNew: true },
  { id: 'cohort_clients', label: 'Когортный анализ по клиентам', isNew: true },
  { id: 'missed_calls', label: 'Отчёт по пропущенным звонкам', isNew: true },
] as const

export type ReportModeId = (typeof REPORT_MODES)[number]['id']
