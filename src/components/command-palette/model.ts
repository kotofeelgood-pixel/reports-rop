import type { IconComponent, AvatarProps, ChipProps, ButtonProps, LinkPropsKeys } from '@bitrix24/b24ui-nuxt';

export type AcceptableValue = string | number | boolean | object | null | undefined;

export interface CommandPaletteItem {
  prefix?: string;
  label?: string;
  suffix?: string;
  icon?: IconComponent;
  avatar?: AvatarProps;
  chip?: ChipProps;
  kbds?: string[] | Array<{ value: string; [key: string]: any }>;
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
  slot?: string;
  placeholder?: string;
  children?: CommandPaletteItem[];
  onSelect?: (e: Event) => void;
  class?: any;
  b24ui?: {
    item?: any;
    itemLeadingIcon?: any;
    itemLeadingAvatarSize?: any;
    itemLeadingAvatar?: any;
    itemLeadingChipSize?: any;
    itemLeadingChip?: any;
    itemLabel?: any;
    itemLabelPrefix?: any;
    itemLabelBase?: any;
    itemLabelSuffix?: any;
    itemTrailing?: any;
    itemTrailingKbds?: any;
    itemTrailingKbdsSize?: any;
    itemTrailingHighlightedIcon?: any;
    itemTrailingIcon?: any;
  };
  [key: string]: any;
}

export interface CommandPaletteGroup<T = CommandPaletteItem> {
  id: string;
  label?: string;
  slot?: string;
  items?: T[];
  ignoreFilter?: boolean;
  postFilter?: (searchTerm: string, items: T[]) => T[];
  highlightedIcon?: IconComponent;
}

export interface CommandPaletteFuseOptions {
  ignoreLocation?: boolean;
  threshold?: number;
  keys?: string[];
  includeMatches?: boolean;
  [key: string]: any;
}

export interface CommandPaletteFuse {
  fuseOptions?: CommandPaletteFuseOptions;
  resultLimit?: number;
  matchAllWhenSearchEmpty?: boolean;
}

export interface CommandPaletteVirtualizeOptions {
  overscan?: number;
  estimateSize?: number;
}

export type CommandPaletteVirtualize = boolean | CommandPaletteVirtualizeOptions;

export interface CommandPaletteModel {
  as?: any;
  icon?: IconComponent;
  trailingIcon?: IconComponent;
  selectedIcon?: IconComponent;
  childrenIcon?: IconComponent;
  placeholder?: string;
  autofocus?: boolean;
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  closeIcon?: IconComponent;
  back?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  backIcon?: IconComponent;
  groups?: CommandPaletteGroup[];
  fuse?: CommandPaletteFuse;
  virtualize?: CommandPaletteVirtualize;
  labelKey?: string | number;
  descriptionKey?: string | number;
  preserveGroupOrder?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  modelValue?: AcceptableValue | AcceptableValue[];
  defaultValue?: AcceptableValue | AcceptableValue[];
  highlightOnHover?: boolean;
  selectionBehavior?: 'replace' | 'toggle';
  loading?: boolean;
  searchTerm?: string;
  b24ui?: {
    root?: any;
    input?: any;
    close?: any;
    back?: any;
    content?: any;
    footer?: any;
    viewport?: any;
    group?: any;
    empty?: any;
    label?: any;
    item?: any;
    itemLeadingIcon?: any;
    itemLeadingAvatar?: any;
    itemLeadingAvatarSize?: any;
    itemLeadingChip?: any;
    itemLeadingChipSize?: any;
    itemTrailing?: any;
    itemTrailingIcon?: any;
    itemTrailingHighlightedIcon?: any;
    itemTrailingKbds?: any;
    itemTrailingKbdsSize?: any;
    itemWrapper?: any;
    itemLabel?: any;
    itemDescription?: any;
    itemLabelBase?: any;
    itemLabelPrefix?: any;
    itemLabelSuffix?: any;
  };
}
