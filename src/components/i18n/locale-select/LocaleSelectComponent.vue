<script lang="ts" setup>
import type { LocaleSelectModel } from './model';

const props = defineProps<LocaleSelectModel>();
const modelValue = defineModel<string | undefined>('modelValue');

defineEmits<{
  'update:modelValue': [payload: string | undefined];
  change: [payload: string | undefined];
}>();

</script>

<template>
  <B24LocaleSelect
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
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
  </B24LocaleSelect>
</template>
