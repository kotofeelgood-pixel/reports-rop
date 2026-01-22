<script lang="ts" setup>
import { useSlots } from 'vue';
import { useTemplateRef } from 'vue';

const slots = useSlots();
const slotNames = Object.keys(slots) as string[];

defineEmits<{
  scroll: [isScrolling: boolean];
}>();

const scrollAreaRef = useTemplateRef<{ virtualizer?: any }>('scrollArea');

defineExpose({
  get virtualizer() {
    return scrollAreaRef.value?.virtualizer;
  },
});

</script>

<template>
  <B24ScrollArea
    ref="scrollArea"
    v-bind="$attrs"
    @scroll="$emit('scroll', $event)"
  >
    <template
      v-for="slot in slotNames"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24ScrollArea>
</template>
