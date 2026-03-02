export const DEAL_DIRECTIONS = [
  { id: 'qualification', label: 'Квалификационная воронка' },
  { id: 'first_license', label: 'Первая продажа лицензии' },
  { id: 'license_renewal', label: 'Продление лицензии' },
  { id: 'annual_subscription', label: 'Годовая подписка' },
  { id: 'service_sale', label: 'Продажа услуг' },
  { id: 'bus', label: 'БУС' },
  { id: 'general', label: 'Общая' },
  { id: 'zdravnitsa', label: 'ЗдравницаСофт' },
  { id: 'website_dev', label: 'разработка сайтов' },
  { id: 'mobile_dev', label: 'разработка мобилок' },
  { id: 'implementation', label: 'заявки на внедрение' },
  { id: 'events', label: 'Мероприятия' },
  { id: 'bitrix_settings', label: 'настройки битрикса' },
] as const

export type DealDirectionId = (typeof DEAL_DIRECTIONS)[number]['id']
