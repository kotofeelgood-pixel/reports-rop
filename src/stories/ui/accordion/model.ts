import type { IconComponent, AccordionItem } from '@bitrix24/b24ui-nuxt';

export type AccordionType = 'single' | 'multiple';

export interface AccordionModel {
  items?: AccordionItem[];
  trailingIcon?: IconComponent;
  labelKey?: string;
  collapsible?: boolean;
  defaultValue?: string | string[];
  modelValue?: string | string[];
  type?: AccordionType;
  disabled?: boolean;
  unmountOnHide?: boolean;
  as?: any;
  b24ui?: {
    root?: any;
    item?: any;
    header?: any;
    trigger?: any;
    content?: any;
    body?: any;
    leadingIcon?: any;
    trailingIcon?: any;
    label?: any;
  };
}
