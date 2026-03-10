import type { Component } from 'vue'
import type { ReportModeId } from '@/types/reportMode'
import ReportTableSalesDepartment from '../ReportTableSalesDepartment.vue'
import ReportTableSalesChannels from '../ReportTableSalesChannels.vue'
import ReportTablePortfolioB2B from '../ReportTablePortfolioB2B.vue'
import ReportTablePortfolioB2C from '../ReportTablePortfolioB2C.vue'
import ReportTablePlaceholder from '../ReportTablePlaceholder.vue'

export const REPORT_MODE_TABLES: Record<ReportModeId, Component> = {
  sales_department: ReportTableSalesDepartment,
  sales_channels: ReportTableSalesChannels,
  portfolio_b2b: ReportTablePortfolioB2B,
  portfolio_b2c: ReportTablePortfolioB2C,
  conversions: ReportTablePlaceholder,
  conversions_short: ReportTablePlaceholder,
  deal_movements: ReportTablePlaceholder,
  sales_activity: ReportTablePlaceholder,
  company_touches_b2b: ReportTablePlaceholder,
  planned_tasks: ReportTablePlaceholder,
  cohort_deals: ReportTablePlaceholder,
  cohort_clients: ReportTablePlaceholder,
  missed_calls: ReportTablePlaceholder,
}

