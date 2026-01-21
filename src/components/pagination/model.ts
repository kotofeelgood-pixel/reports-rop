import type { IconComponent } from '@bitrix24/b24ui-nuxt';
import type { RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from 'vue-router';

export type PaginationColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-copilot'
  | 'air-secondary'
  | 'air-secondary-alert'
  | 'air-secondary-accent'
  | 'air-secondary-accent-1'
  | 'air-secondary-accent-2'
  | 'air-secondary-no-accent'
  | 'air-tertiary'
  | 'air-tertiary-accent'
  | 'air-tertiary-no-accent'
  | 'air-selection'
  | 'air-boost'
  | 'link';

export type PaginationActiveColor = 
  | 'default'
  | 'air-secondary-no-accent'
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-copilot'
  | 'air-secondary'
  | 'air-secondary-alert'
  | 'air-secondary-accent'
  | 'air-secondary-accent-1'
  | 'air-secondary-accent-2'
  | 'air-tertiary'
  | 'air-tertiary-accent'
  | 'air-tertiary-no-accent'
  | 'air-selection'
  | 'air-boost'
  | 'danger'
  | 'success'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'collab'
  | 'ai'
  | 'link';

export type PaginationSize = 'xss' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface PaginationModel {
  as?: any;
  firstIcon?: IconComponent;
  prevIcon?: IconComponent;
  nextIcon?: IconComponent;
  lastIcon?: IconComponent;
  ellipsisIcon?: IconComponent;
  color?: PaginationColor;
  activeColor?: PaginationActiveColor;
  showControls?: boolean;
  size?: PaginationSize;
  to?: ((page: number) => string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined);
  defaultPage?: number;
  disabled?: boolean;
  itemsPerPage?: number;
  page?: number;
  showEdges?: boolean;
  siblingCount?: number;
  total?: number;
  b24ui?: {
    root?: any;
    list?: any;
    ellipsis?: any;
    label?: any;
    first?: any;
    prev?: any;
    item?: any;
    next?: any;
    last?: any;
  };
}
