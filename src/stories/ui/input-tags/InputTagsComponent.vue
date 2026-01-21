<script lang="ts" setup>
import type { InputTagsModel } from './model';
import type { AcceptableInputValue } from '@bitrix24/b24ui-nuxt';

const props = defineProps<InputTagsModel>();
const modelValue = defineModel<AcceptableInputValue[] | null>('modelValue');

defineEmits<{
  'update:modelValue': [payload: AcceptableInputValue[]];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  invalid: [payload: AcceptableInputValue];
  addTag: [payload: AcceptableInputValue];
  removeTag: [payload: AcceptableInputValue];
}>();

</script>

<template>
  <B24InputTags
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @invalid="$emit('invalid', $event)"
    @add-tag="$emit('addTag', $event)"
    @remove-tag="$emit('removeTag', $event)"
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
  </B24InputTags>
</template>
