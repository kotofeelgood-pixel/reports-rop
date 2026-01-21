<script lang="ts" setup>
import type { TabsModel } from './model';
import { useTemplateRef } from 'vue';

const props = defineProps<TabsModel>();
const modelValue = defineModel<string | number | undefined>('modelValue');

defineEmits<{
  'update:modelValue': [payload: string | number];
}>();

defineSlots<{
  leading(): any;
  default(): any;
  trailing(): any;
  content(): any;
  'list-leading'(): any;
  'list-trailing'(): any;
}>();

const tabsRef = useTemplateRef<{ triggersRef?: any[] }>('tabs');

defineExpose({
  get triggersRef() {
    return tabsRef.value?.triggersRef;
  },
});

</script>

<template>
  <B24Tabs
    ref="tabs"
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Tabs>
</template>
