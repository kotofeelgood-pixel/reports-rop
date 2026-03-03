import type { Component } from 'vue'
import type { ReportModeId } from '@/types/reportMode'
import ReportTableSalesDepartment from '../ReportTableSalesDepartment.vue'
import ReportTablePlaceholder from '../ReportTablePlaceholder.vue'

export const REPORT_MODE_TABLES: Record<ReportModeId, Component> = {
  sales_department: ReportTableSalesDepartment,
  sales_channels: ReportTablePlaceholder,
  portfolio_b2b: ReportTablePlaceholder,
  portfolio_b2c: ReportTablePlaceholder,
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

