<script lang="ts" setup>
import type { InputDateModel } from './model';
import type { AcceptableInputValue } from '@bitrix24/b24ui-nuxt';

const props = defineProps<InputDateModel>();
const modelValue = defineModel<AcceptableInputValue | null>('modelValue');

defineEmits<{
  'update:modelValue': [payload: AcceptableInputValue | null];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

</script>

<template>
  <B24InputDate
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  >
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24InputDate>
</template>
