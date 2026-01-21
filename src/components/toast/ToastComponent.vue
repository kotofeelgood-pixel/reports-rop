<script lang="ts" setup>
import type { ToastModel } from './model';
import { useTemplateRef } from 'vue';

const props = defineProps<ToastModel>();
const open = defineModel<boolean>('open', { default: true });

defineEmits<{
  pause: [];
  escapeKeyDown: [event: KeyboardEvent];
  resume: [];
  swipeStart: [event: any];
  swipeMove: [event: any];
  swipeCancel: [event: any];
  swipeEnd: [event: any];
  'update:open': [value: boolean];
}>();

defineSlots<{
  leading(): any;
  title(): any;
  description(): any;
  actions(): any;
  close(): any;
}>();

const toastRef = useTemplateRef<{ height?: number }>('toast');

defineExpose({
  get height() {
    return toastRef.value?.height;
  },
});

</script>

<template>
  <B24Toast
    ref="toast"
    v-bind="props"
    v-model:open="open"
    @pause="$emit('pause')"
    @escape-key-down="$emit('escapeKeyDown', $event)"
    @resume="$emit('resume')"
    @swipe-start="$emit('swipeStart', $event)"
    @swipe-move="$emit('swipeMove', $event)"
    @swipe-cancel="$emit('swipeCancel', $event)"
    @swipe-end="$emit('swipeEnd', $event)"
    @update:open="$emit('update:open', $event)"
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
  </B24Toast>
</template>
