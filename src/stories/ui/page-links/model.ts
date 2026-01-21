import type { PageLink } from '@bitrix24/b24ui-nuxt';

export interface PageLinksModel {
  as?: any;
  title?: string;
  links?: PageLink[];
  b24ui?: {
    root?: any;
    title?: any;
    list?: any;
    item?: any;
    link?: any;
    linkWrapper?: any;
    linkLeadingIcon?: any;
    linkLabel?: any;
    linkLabelExternalIcon?: any;
  };
}
