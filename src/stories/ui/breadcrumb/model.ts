import type { BreadcrumbItem, IconComponent } from '@bitrix24/b24ui-nuxt';

export interface BreadcrumbModel {
  as?: any;
  items?: BreadcrumbItem[];
  separatorIcon?: IconComponent;
  labelKey?: string;
  b24ui?: {
    root?: any;
    list?: any;
    item?: any;
    link?: any;
    linkLeadingIcon?: any;
    linkLeadingAvatar?: any;
    linkLeadingAvatarSize?: any;
    linkLabel?: any;
    separator?: any;
    separatorIcon?: any;
  };
}
