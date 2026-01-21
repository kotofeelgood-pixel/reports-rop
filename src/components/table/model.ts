import type { TableColumn, TableMeta, TableRow } from '@bitrix24/b24ui-nuxt';
import type { WatchOptions } from 'vue';

export type TableLoadingColor =
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-copilot'
  | 'air-primary-warning';

export type TableLoadingAnimation = 'loading' | 'carousel' | 'carousel-inverse' | 'swing' | 'elastic';

export type TableSticky = boolean | 'header' | 'footer';

export interface TableModel {
  as?: any;
  data?: unknown[];
  columns?: TableColumn<unknown, unknown>[];
  caption?: string;
  meta?: TableMeta<unknown>;
  virtualize?: boolean | Record<string, any>;
  empty?: string;
  sticky?: TableSticky;
  loading?: boolean;
  loadingColor?: TableLoadingColor;
  loadingAnimation?: TableLoadingAnimation;
  watchOptions?: WatchOptions<boolean>;
  globalFilterOptions?: Record<string, any>;
  columnFiltersOptions?: Record<string, any>;
  columnPinningOptions?: Record<string, any>;
  columnSizingOptions?: Record<string, any>;
  visibilityOptions?: Record<string, any>;
  sortingOptions?: Record<string, any>;
  groupingOptions?: Record<string, any>;
  expandedOptions?: Record<string, any>;
  rowSelectionOptions?: Record<string, any>;
  rowPinningOptions?: Record<string, any>;
  paginationOptions?: Record<string, any>;
  facetedOptions?: Record<string, any>;
  onSelect?: (e: Event, row: TableRow<unknown>) => void;
  onHover?: (e: Event, row: TableRow<unknown> | null) => void;
  onContextmenu?: (e: Event, row: TableRow<unknown>) => void | ((e: Event, row: TableRow<unknown>) => void)[];
  state?: Record<string, any>;
  onStateChange?: (updater: any) => void;
  renderFallbackValue?: any;
  _features?: any[];
  autoResetAll?: boolean;
  debugAll?: boolean;
  debugCells?: boolean;
  debugColumns?: boolean;
  debugHeaders?: boolean;
  debugRows?: boolean;
  debugTable?: boolean;
  defaultColumn?: Record<string, any>;
  getRowId?: (originalRow: unknown, index: number, parent?: TableRow<unknown>) => string;
  getSubRows?: (originalRow: unknown, index: number) => unknown[] | undefined;
  initialState?: Record<string, any>;
  mergeOptions?: (defaultOptions: any, options: any) => any;
  cellpadding?: number | string;
  cellspacing?: number | string;
  summary?: string;
  width?: number | string;
  globalFilter?: string;
  columnFilters?: Record<string, any>;
  columnOrder?: string[];
  columnVisibility?: Record<string, boolean>;
  columnPinning?: Record<string, any>;
  columnSizing?: Record<string, any>;
  columnSizingInfo?: Record<string, any>;
  rowSelection?: Record<string, boolean>;
  rowPinning?: Record<string, any>;
  sorting?: Array<{ id: string; desc: boolean }>;
  grouping?: string[];
  expanded?: Record<string, boolean>;
  pagination?: Record<string, any>;
  b24ui?: {
    root?: any;
    base?: any;
    caption?: any;
    thead?: any;
    tbody?: any;
    tfoot?: any;
    tr?: any;
    th?: any;
    td?: any;
    separator?: any;
    empty?: any;
    loading?: any;
  };
}
