import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt';

export type DescriptionListSize = 'md' | 'sm';

export interface DescriptionListModel {
  legend?: string;
  text?: string;
  labelKey?: string;
  descriptionKey?: string;
  items?: DescriptionListItem[];
  size?: DescriptionListSize;
  b24ui?: {
    root?: any;
    legend?: any;
    text?: any;
    container?: any;
    labelWrapper?: any;
    icon?: any;
    avatar?: any;
    avatarSize?: any;
    label?: any;
    descriptionWrapper?: any;
    description?: any;
    actions?: any;
    footer?: any;
  };
}
