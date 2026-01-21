import type { IconComponent, ButtonProps } from '@bitrix24/b24ui-nuxt';

export interface EmptyModel {
  as?: any;
  icon?: IconComponent;
  title?: string;
  description?: string;
  action?: ButtonProps | boolean;
  b24ui?: {
    root?: any;
    icon?: any;
    title?: any;
    description?: any;
    action?: any;
  };
}
