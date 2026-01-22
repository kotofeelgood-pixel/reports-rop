<script lang="ts" setup>
import { useTemplateRef, useSlots } from 'vue';

const slots = useSlots()

defineEmits<{
  'update:modelValue': [payload: string | number];
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
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template
      v-for="(_, slot) in slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24Tabs>
</template>
