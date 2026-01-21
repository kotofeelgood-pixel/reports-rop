import type { IconComponent, ButtonProps, LinkPropsKeys } from '@bitrix24/b24ui-nuxt';

export type OverlayBlur = 'auto' | 'on' | 'off';

export interface DialogContentProps {
  as?: any;
  asChild?: boolean;
  forceMount?: boolean;
  [key: string]: any;
}

export interface ModalModel {
  title?: string;
  description?: string;
  content?: Omit<DialogContentProps, 'as' | 'asChild' | 'forceMount'>;
  overlay?: boolean;
  scrollable?: boolean;
  overlayBlur?: OverlayBlur;
  transition?: boolean;
  fullscreen?: boolean;
  portal?: string | boolean | HTMLElement;
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  closeIcon?: IconComponent;
  dismissible?: boolean;
  scrollbarThin?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  b24ui?: {
    overlay?: any;
    content?: any;
    contentWrapper?: any;
    header?: any;
    wrapper?: any;
    body?: any;
    footer?: any;
    title?: any;
    description?: any;
    close?: any;
  };
}
