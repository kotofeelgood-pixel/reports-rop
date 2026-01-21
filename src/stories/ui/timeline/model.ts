import type { IconComponent, AvatarProps } from '@bitrix24/b24ui-nuxt';

export type TimelineSize = '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type TimelineColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type TimelineOrientation = 'horizontal' | 'vertical';

export interface TimelineItem {
  date?: string;
  title?: string;
  description?: string;
  icon?: IconComponent;
  avatar?: AvatarProps;
  value?: string | number;
  slot?: string;
  class?: any;
  b24ui?: {
    item?: any;
    container?: any;
    indicator?: any;
    separator?: any;
    wrapper?: any;
    date?: any;
    title?: any;
    description?: any;
  };
  [key: string]: any;
}

export interface TimelineModel {
  as?: any;
  items: TimelineItem[];
  size?: TimelineSize;
  color?: TimelineColor;
  orientation?: TimelineOrientation;
  defaultValue?: string | number;
  reverse?: boolean;
  modelValue?: string | number;
  b24ui?: {
    root?: any;
    item?: any;
    container?: any;
    indicator?: any;
    separator?: any;
    wrapper?: any;
    date?: any;
    title?: any;
    description?: any;
  };
}
