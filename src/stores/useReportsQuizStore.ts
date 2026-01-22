import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { callBitrixMethod } from '@/api/api'
import { getDealCategories } from '@/api/routes/crm'

export interface ReportMode {
  label: string
  value: string
  isNew?: boolean
}

export interface DealDirection {
  label: string
  value: string
}

export interface Employee {
  id: string | number
  label: string
  value: string | number
  avatar?: {
    src?: string
  }
  dismissed?: boolean
  department?: string
}

interface BitrixStatus {
  STATUS_ID?: string
  statusId?: string
  NAME?: string
  name?: string
}

export const useReportQuizStore = defineStore('reportQuiz', () => {
  const reportModes = ref<ReportMode[]>([
    { label: 'Отчет по отделу продаж', value: 'sales-department' },
    { label: 'Отчет по каналам продаж', value: 'sales-channels' },
    { label: 'Отчет по Портфелю В2В (по компаниям)', value: 'portfolio-b2b' },
    { label: 'Отчет по Портфелю В2С (по контактам)', value: 'portfolio-b2c' },
    { label: 'Отчет по конверсиям', value: 'conversions', isNew: true },
    { label: 'Отчет по конверсиям (сокращённый)', value: 'conversions-short', isNew: true },
    { label: 'Отчет по движениям Сделок', value: 'deal-movements', isNew: true },
    { label: 'Отчет по активности в продажах', value: 'sales-activity', isNew: true },
    { label: 'Отчет по касаниям Компаний (B2B)', value: 'company-touches', isNew: true },
    { label: 'Отчет по запланированным делам', value: 'planned-tasks', isNew: true },
    { label: 'Когортный анализ сделок', value: 'cohort-deals', isNew: true },
    { label: 'Когортный анализ по клиентам', value: 'cohort-clients', isNew: true },
    { label: 'Отчёт по пропущенным звонкам', value: 'missed-calls', isNew: true },
  ])

  const dealDirectionsList = ref<DealDirection[]>([
    { label: 'Квалификационная воронка', value: 'qualification' },
    { label: 'Первая продажа лицензии', value: 'first-license' },
    { label: 'Продление лицензии', value: 'license-renewal' },
    { label: 'Годовая подписка', value: 'annual-subscription' },
    { label: 'Продажа услуг', value: 'services' },
    { label: 'БУС', value: 'bus' },
    { label: 'Общая', value: 'general' },
    { label: 'ЗдравницаСофт', value: 'zdravnitsasoft' },
    { label: 'разработка сайтов', value: 'website-dev' },
    { label: 'разработка мобилок', value: 'mobile-dev' },
    { label: 'заявки на внедрение', value: 'implementation' },
    { label: 'Мероприятия', value: 'events' },
  ])

  const funnelStages = ref([
    { label: '-', value: null },
    { label: 'Первичный контакт', value: 'primary-contact' },
    { label: 'Квалификация', value: 'qualification' },
    { label: 'Предложение', value: 'proposal' },
    { label: 'Переговоры', value: 'negotiation' },
    { label: 'Закрытие', value: 'closing' },
  ])

  // Шаг 1: Режим отчета
  const reportMode = ref<string>('sales-department')

  // Шаг 2: Пользователи и период
  const selectedEmployees = ref<Employee[]>([])
  const startDate = ref<string | null>(null)
  const endDate = ref<string | null>(null)

  // Моковые данные сотрудников
  const employeesData = ref<Employee[]>([
    { id: 1, label: 'Вареников Родион', value: 1, department: 'IT Solutions' },
    { id: 2, label: 'Вареникова Татьяна', value: 2, department: 'IT Solutions' },
    { id: 3, label: 'Битрикс24 Интегратор', value: 3, department: 'IT Solutions' },
    { id: 4, label: 'Гнутова Анастасия', value: 4, department: 'IT Solutions' },
    { id: 5, label: 'Клименченко Дмитрий', value: 5, department: 'IT Solutions' },
    { id: 6, label: '23sazonov@gmail.com', value: 6, department: 'IT Solutions' },
    { id: 7, label: 'Емцева Марина', value: 7, department: 'IT Solutions' },
    { id: 8, label: 'Зубрилин Сергей', value: 8, department: 'IT Solutions' },
    { id: 9, label: 'Базекин Максим', value: 9, department: 'IT Solutions' },
    { id: 10, label: 'Глебова Алиса', value: 10, department: 'IT Solutions' },
    { id: 11, label: 'Русинов Дмитрий', value: 11, department: 'IT Solutions' },
    { id: 12, label: 'Котенко Виктор', value: 12, department: 'IT Solutions' },
    { id: 13, label: 'Иванов Иван', value: 13, department: 'Colba', dismissed: true },
    { id: 14, label: 'Петров Петр', value: 14, department: 'IT Solutions', dismissed: true },
  ])

  // Шаг 3: Направления сделок
  const dealDirections = ref<string[]>(dealDirectionsList.value.map(d => d.value))
  const allDirectionsSelected = computed(() => {
    return dealDirections.value.length === dealDirectionsList.value.length
  })

  // Шаг 4: Этапы воронки
  const funnelStage = ref<string | null>(null)

  // Шаг 5: Настройки отчета
  const hideCallsSection = ref<boolean>(false)
  const effectiveCallSeconds = ref<number>(5)
  const hideLeadsSection = ref<boolean>(false)
  const hideDealsSection = ref<boolean>(false)

  // Текущий шаг квиза
  const currentStep = ref<number>(0)

  // Состояние загрузки
  const isLoading = ref<boolean>(false)
  const loadingError = ref<string | null>(null)
  const loadErrors = ref<Record<string, string>>({})

  // Загрузка пользовательских настроек
  const loadUserOptions = async () => {
    try {
      // Загружаем сохраненные настройки отчета
      const options = await Promise.all([
        callBitrixMethod('user.option.get', { option: 'report_hideCallsSection' }).catch(() => null),
        callBitrixMethod('user.option.get', { option: 'report_hideLeadsSection' }).catch(() => null),
        callBitrixMethod('user.option.get', { option: 'report_hideDealsSection' }).catch(() => null),
        callBitrixMethod('user.option.get', { option: 'report_effectiveCallSeconds' }).catch(() => null),
      ])

      const [hideCalls, hideLeads, hideDeals, callSeconds] = options

      if (hideCalls !== null && hideCalls !== undefined && typeof hideCalls === 'boolean') {
        hideCallsSection.value = hideCalls
      }
      if (hideLeads !== null && hideLeads !== undefined && typeof hideLeads === 'boolean') {
        hideLeadsSection.value = hideLeads
      }
      if (hideDeals !== null && hideDeals !== undefined && typeof hideDeals === 'boolean') {
        hideDealsSection.value = hideDeals
      }
      if (callSeconds !== null && callSeconds !== undefined && typeof callSeconds === 'number') {
        effectiveCallSeconds.value = callSeconds
      }

      console.log('User options loaded')
    } catch (error) {
      console.error('Ошибка загрузки пользовательских настроек:', error)
    }
  }

  // Загрузка информации о размещении
  const loadPlacement = async () => {
    try {
      const result = await callBitrixMethod('placement.get', {})
      console.log('Placement info loaded:', result)
    } catch (error) {
      console.error('Ошибка загрузки информации о размещении:', error)
    }
  }

  // Загрузка статусов CRM (этапы воронки)
  const loadFunnelStages = async () => {
    try {
      // Загружаем статусы для сделок
      // Используем правильный формат для crm.status.list
      const result = await callBitrixMethod('crm.status.list', {
        filter: {
          ENTITY_ID: 'DEAL_STAGE',
        },
      })

      if (result && Array.isArray(result) && result.length > 0) {
        funnelStages.value = [
          { label: '-', value: null },
          ...(result as BitrixStatus[]).map((status) => ({
            label: status.NAME || status.name || '',
            value: (status.STATUS_ID || status.statusId || '') as string,
          })),
        ]
        // Удаляем ошибку, если загрузка успешна
        delete loadErrors.value.funnelStages
      } else {
        // Если статусов нет, оставляем дефолтные значения
        console.log('Статусы воронки не найдены, используются значения по умолчанию')
        delete loadErrors.value.funnelStages
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
      // Показываем понятное сообщение, скрывая технические детали
      if (errorMessage.includes('function()')) {
        loadErrors.value.funnelStages = 'Не удалось загрузить статусы воронки. Используются значения по умолчанию.'
      } else {
        loadErrors.value.funnelStages = `Не удалось загрузить статусы воронки: ${errorMessage}`
      }
      console.error('Ошибка загрузки статусов воронки:', error)
      // Оставляем дефолтные значения при ошибке
    }
  }

  // Загрузка настроек приложения
  const loadAppOptions = async () => {
    try {
      const result = await callBitrixMethod('app.option.get', {})
      console.log('App options loaded:', result)
      // Настройки приложения можно использовать для других целей
      // Удаляем ошибку, если загрузка успешна
      delete loadErrors.value.appOptions
    } catch (error) {
      // Для app.option.get ошибка может быть нормальной, если опций нет
      // Не показываем ошибку, если это не критично
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка'
      if (!errorMessage.includes('не найден') && !errorMessage.includes('not found')) {
        loadErrors.value.appOptions = `Не удалось загрузить настройки приложения`
      } else {
        delete loadErrors.value.appOptions
      }
      console.error('Ошибка загрузки настроек приложения:', error)
    }
  }

  // Загрузка режима настроек CRM
  const loadCrmSettingsMode = async () => {
    try {
      const result = await callBitrixMethod('crm.settings.mode.get', {})
      console.log('CRM settings mode loaded:', result)
    } catch (error) {
      console.error('Ошибка загрузки режима настроек CRM:', error)
    }
  }

  // Сохранение пользовательских настроек
  const saveUserOptions = async (optionName: string, value: boolean | number | string) => {
    try {
      await callBitrixMethod('user.option.set', {
        option: optionName,
        value: value,
      })
    } catch (error) {
      console.error('Ошибка сохранения пользовательских настроек:', error)
    }
  }

  // Ожидание загрузки BX24 API
  const waitForBX24 = (maxAttempts = 50, interval = 100): Promise<void> => {
    return new Promise((resolve, reject) => {
      let attempts = 0

      const checkBX24 = () => {
        if (window.BX24 && typeof window.BX24.init === 'function') {
          resolve()
        } else if (attempts >= maxAttempts) {
          reject(new Error('BX24 API не загрузился за отведенное время'))
        } else {
          attempts++
          setTimeout(checkBX24, interval)
        }
      }

      checkBX24()
    })
  }

  // Инициализация и загрузка всех данных
  const initializeQuiz = async () => {
    isLoading.value = true
    loadingError.value = null

    try {
      // Ждем загрузки BX24 API
      await waitForBX24()

      if (!window.BX24) {
        throw new Error('BX24 не доступен после ожидания')
      }

      window.BX24.init(async () => {
        try {
          // Загружаем все необходимые данные параллельно
          await Promise.all([
            loadUserOptions(),
            loadPlacement(),
            loadDealCategories(),
            loadFunnelStages(),
            loadAppOptions(),
            loadCrmSettingsMode(),
          ])
        } catch (error) {
          loadingError.value = error instanceof Error ? error.message : 'Неизвестная ошибка'
          console.error('Ошибка инициализации квиза:', error)
        } finally {
          isLoading.value = false
        }
      })
    } catch (error) {
      isLoading.value = false
      loadingError.value = error instanceof Error ? error.message : 'Неизвестная ошибка'
      console.error('Ошибка инициализации BX24:', error)
    }
  }

  const toggleAllDirections = () => {
    if (allDirectionsSelected.value) {
      dealDirections.value = []
    } else {
      dealDirections.value = dealDirectionsList.value.map(d => d.value)
    }
  }

  const generateReport = async () => {
    // Сохраняем настройки отчета
    try {
      await Promise.all([
        saveUserOptions('report_hideCallsSection', hideCallsSection.value),
        saveUserOptions('report_hideLeadsSection', hideLeadsSection.value),
        saveUserOptions('report_hideDealsSection', hideDealsSection.value),
        saveUserOptions('report_effectiveCallSeconds', effectiveCallSeconds.value),
      ])
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error)
    }

    const reportData = {
      reportMode: reportMode.value,
      selectedEmployees: selectedEmployees.value,
      startDate: startDate.value,
      endDate: endDate.value,
      dealDirections: dealDirections.value,
      funnelStage: funnelStage.value,
      settings: {
        hideCallsSection: hideCallsSection.value,
        effectiveCallSeconds: effectiveCallSeconds.value,
        hideLeadsSection: hideLeadsSection.value,
        hideDealsSection: hideDealsSection.value,
      },
    }

    console.log('Формирование отчета:', reportData)
    // Здесь будет логика отправки данных на сервер
    return reportData
  }

  const loadDealCategories = async () => {
    try {
      const result = await getDealCategories()
      console.log('Deal categories loaded:', result)
    } catch (error) {
      console.error('Ошибка загрузки категорий сделок:', error)
    }
  }

  return {
    // State
    reportMode,
    selectedEmployees,
    startDate,
    endDate,
    dealDirections,
    funnelStage,
    hideCallsSection,
    effectiveCallSeconds,
    hideLeadsSection,
    hideDealsSection,
    currentStep,
    isLoading,
    loadingError,
    loadErrors,

    // Computed
    allDirectionsSelected,

    // Data
    reportModes,
    dealDirectionsList,
    funnelStages,
    employeesData,

    // Methods
    toggleAllDirections,
    generateReport,
    initializeQuiz,
    loadUserOptions,
    loadPlacement,
    loadDealCategories,
    loadFunnelStages,
    loadAppOptions,
    loadCrmSettingsMode,
    saveUserOptions,
  }
})

export const useReportQuizStoreRefs  = () => storeToRefs(useReportQuizStore())
