<script lang="ts" setup>
import type { InputTimeModel } from './model';
import type { AcceptableValue } from '@bitrix24/b24ui-nuxt';

const props = defineProps<InputTimeModel>();
const modelValue = defineModel<AcceptableValue | null>('modelValue');

defineEmits<{
  'update:modelValue': [payload: AcceptableValue | null];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

</script>

<template>
  <B24InputTime
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  >
    <template
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot as string"
        v-bind="scope"
      />
    </template>
  </B24InputTime>
</template>
