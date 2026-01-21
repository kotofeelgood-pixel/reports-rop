import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'

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

  const toggleAllDirections = () => {
    if (allDirectionsSelected.value) {
      dealDirections.value = []
    } else {
      dealDirections.value = dealDirectionsList.value.map(d => d.value)
    }
  }

  const generateReport = () => {
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
  }
})

export const useReportQuizStoreRefs  = () => storeToRefs(useReportQuizStore())
