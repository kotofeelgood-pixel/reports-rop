import type { IconComponent, ButtonProps } from '@bitrix24/b24ui-nuxt';
import type { RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from 'vue-router';

export type BannerColor =
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot'
  | 'air-secondary'
  | 'air-secondary-alert'
  | 'air-secondary-accent'
  | 'air-secondary-accent-1'
  | 'air-secondary-accent-2'
  | 'air-tertiary';

export interface BannerModel {
  as?: any;
  id?: string;
  icon?: IconComponent;
  title?: string;
  actions?: ButtonProps[];
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null;
  color?: BannerColor;
  close?: boolean | Omit<ButtonProps, 'to' | 'href' | 'target' | 'rel' | 'download'>;
  closeIcon?: IconComponent;
  b24ui?: {
    root?: any;
    container?: any;
    left?: any;
    center?: any;
    right?: any;
    icon?: any;
    title?: any;
    actions?: any;
    close?: any;
  };
}
