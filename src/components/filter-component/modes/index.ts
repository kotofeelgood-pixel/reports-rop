/**
 * Маппинг режимов отчёта на компоненты фильтров.
 * Каждый режим имеет свой набор фильтров (см. комментарии в компонентах).
 */
import type { Component } from 'vue'
import type { ReportModeId } from '@/types/reportMode'
import FiltersSalesDepartment from './FiltersSalesDepartment.vue'
import FiltersSalesChannels from './FiltersSalesChannels.vue'
import FiltersPortfolioB2b from './FiltersPortfolioB2b.vue'
import FiltersPortfolioB2c from './FiltersPortfolioB2c.vue'
import FiltersConversions from './FiltersConversions.vue'
import FiltersConversionsShort from './FiltersConversionsShort.vue'
import FiltersDealMovements from './FiltersDealMovements.vue'
import FiltersSalesActivity from './FiltersSalesActivity.vue'
import FiltersCompanyTouchesB2b from './FiltersCompanyTouchesB2b.vue'
import FiltersPlannedTasks from './FiltersPlannedTasks.vue'
import FiltersCohortDeals from './FiltersCohortDeals.vue'
import FiltersCohortClients from './FiltersCohortClients.vue'
import FiltersMissedCalls from './FiltersMissedCalls.vue'

export const REPORT_MODE_FILTERS: Record<ReportModeId, Component> = {
  sales_department: FiltersSalesDepartment,
  sales_channels: FiltersSalesChannels,
  portfolio_b2b: FiltersPortfolioB2b,
  portfolio_b2c: FiltersPortfolioB2c,
  conversions: FiltersConversions,
  conversions_short: FiltersConversionsShort,
  deal_movements: FiltersDealMovements,
  sales_activity: FiltersSalesActivity,
  company_touches_b2b: FiltersCompanyTouchesB2b,
  planned_tasks: FiltersPlannedTasks,
  cohort_deals: FiltersCohortDeals,
  cohort_clients: FiltersCohortClients,
  missed_calls: FiltersMissedCalls,
}
