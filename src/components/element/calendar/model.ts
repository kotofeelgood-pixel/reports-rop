export interface CalendarModel {
  as?: any;
  defaultValue?: Date | Date[];
  modelValue?: Date | Date[];
  mode?: 'single' | 'range' | 'multiple';
  disabled?: boolean;
  b24ui?: {
    root?: any;
    grid?: any;
    cell?: any;
    day?: any;
  };
}
