<script lang="ts" setup>
import type { ModalModel } from './model';

const props = defineProps<ModalModel>();
const open = defineModel<boolean>('open');

defineEmits<{
  'after:leave': [];
  'after:enter': [];
  'close:prevent': [];
  'update:open': [value: boolean];
}>();

defineSlots<{
  default(): any;
  content(): any;
  header(): any;
  title(): any;
  description(): any;
  actions(): any;
  close(): any;
  body(): any;
  footer(): any;
}>();

</script>

<template>
  <B24Modal
    v-bind="props"
    v-model:open="open"
    @after:leave="$emit('after:leave')"
    @after:enter="$emit('after:enter')"
    @close:prevent="$emit('close:prevent')"
    @update:open="$emit('update:open', $event)"
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
  </B24Modal>
</template>
