export type RangeColor = 
  | 'air-primary'
  | 'air-primary-success'
  | 'air-primary-alert'
  | 'air-primary-warning'
  | 'air-primary-copilot';

export type RangeSize = 'xs' | 'sm' | 'md' | 'lg';

export type RangeOrientation = 'horizontal' | 'vertical';

export interface RangeModel {
  as?: any;
  size?: RangeSize;
  color?: RangeColor;
  orientation?: RangeOrientation;
  tooltip?: boolean | Record<string, any>;
  defaultValue?: number | number[];
  name?: string;
  disabled?: boolean;
  inverted?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
  modelValue?: number | number[];
  b24ui?: {
    root?: any;
    track?: any;
    range?: any;
    thumb?: any;
  };
}
