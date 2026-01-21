export type ScrollAreaOrientation = 'vertical' | 'horizontal';

export interface ScrollAreaVirtualizeOptions {
  gap?: number;
  lanes?: number;
  estimateSize?: number;
  paddingStart?: number;
  paddingEnd?: number;
  overscan?: number;
}

export interface ScrollAreaModel {
  as?: any;
  orientation?: ScrollAreaOrientation;
  items?: unknown[];
  virtualize?: boolean | ScrollAreaVirtualizeOptions;
  b24ui?: {
    root?: any;
    viewport?: any;
    item?: any;
  };
}
