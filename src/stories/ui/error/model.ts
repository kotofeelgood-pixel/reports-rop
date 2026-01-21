import type { ButtonProps } from '@bitrix24/b24ui-nuxt';

export interface NuxtError {
  statusCode?: number;
  statusMessage?: string;
  message?: string;
  fatal?: boolean;
  [key: string]: any;
}

export interface ErrorModel {
  as?: any;
  error?: Partial<NuxtError & { message: string }>;
  redirect?: string;
  clear?: boolean | ButtonProps;
  b24ui?: {
    root?: any;
    statusCode?: any;
    statusMessage?: any;
    message?: any;
    links?: any;
  };
}
