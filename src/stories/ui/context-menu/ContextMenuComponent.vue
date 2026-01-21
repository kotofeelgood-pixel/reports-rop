<script lang="ts" setup>
import type { ContextMenuModel } from './model';

const props = defineProps<ContextMenuModel>();
const open = defineModel<boolean>('open');

defineEmits<{
  'update:open': [payload: boolean];
}>();

defineSlots<{
  default(): any;
  item(): any;
  'item-leading'(): any;
  'item-label'(): any;
  'item-description'(): any;
  'item-trailing'(): any;
  'content-top'(): any;
  'content-bottom'(): any;
}>();

</script>

<template>
  <B24ContextMenu
    v-bind="props"
    v-model:open="open"
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
  </B24ContextMenu>
</template>
