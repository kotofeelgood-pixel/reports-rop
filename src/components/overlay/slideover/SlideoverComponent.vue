<script lang="ts" setup>
import type { SlideoverModel } from './model';

const props = defineProps<SlideoverModel>();
const modelValue = defineModel<boolean>('modelValue');

defineSlots<{
  default(): any;
}>();

defineEmits<{
  'update:modelValue': [payload: boolean];
}>();

</script>

<template>
  <B24Slideover
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Slideover>
</template>
