import type { IconComponent, AvatarProps, ButtonProps, LinkPropsKeys, ProgressProps } from '@bitrix24/b24ui-nuxt';

export type ToastColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot'
  | 'air-secondary';

export type ToastOrientation = 'horizontal' | 'vertical';

export type ToastType = 'foreground' | 'background';

export type StringOrVNode = string | any;

export interface ToastModel {
  as?: any;
  title?: StringOrVNode;
  description?: StringOrVNode;
  icon?: IconComponent;
  avatar?: AvatarProps;
  color?: ToastColor;
  orientation?: ToastOrientation;
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  closeIcon?: IconComponent;
  actions?: ButtonProps[];
  progress?: boolean | Pick<ProgressProps, 'color' | 'b24ui'>;
  defaultOpen?: boolean;
  open?: boolean;
  type?: ToastType;
  duration?: number;
  b24ui?: {
    root?: any;
    wrapper?: any;
    title?: any;
    description?: any;
    icon?: any;
    avatar?: any;
    avatarSize?: any;
    actions?: any;
    progress?: any;
    close?: any;
  };
}
