<script lang="ts" setup>
import type { ScrollAreaModel } from './model';
import { useTemplateRef } from 'vue';

const props = defineProps<ScrollAreaModel>();

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
    v-bind="props"
    @scroll="$emit('scroll', $event)"
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
  </B24ScrollArea>
</template>
