import type { IconComponent, AvatarProps, ButtonProps } from '@bitrix24/b24ui-nuxt';

export type AlertColor =
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

export type AlertSize = 'md' | 'sm';

export type AlertOrientation = 'vertical' | 'horizontal';

export interface AlertModel {
  as?: any;
  title?: string;
  description?: string;
  icon?: IconComponent;
  avatar?: AvatarProps;
  color?: AlertColor;
  inverted?: boolean;
  orientation?: AlertOrientation;
  size?: AlertSize;
  actions?: ButtonProps[];
  close?: boolean | Omit<ButtonProps, 'to' | 'href' | 'target' | 'rel' | 'download'>;
  closeIcon?: IconComponent;
  b24ui?: {
    root?: any;
    wrapper?: any;
    title?: any;
    description?: any;
    icon?: any;
    avatar?: any;
    avatarSize?: any;
    actions?: any;
    close?: any;
  };
}
