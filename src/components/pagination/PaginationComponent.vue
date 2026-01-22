<script lang="ts" setup>
import type { PaginationModel } from './model';

const props = defineProps<PaginationModel>();
const page = defineModel<number>('page');

defineEmits<{
  'update:page': [value: number];
}>();

defineSlots<{
  first(): any;
  prev(): any;
  next(): any;
  last(): any;
  ellipsis(): any;
  item(): any;
}>();

</script>

<template>
  <B24Pagination
    v-bind="props"
    v-model:page="page"
    @update:page="$emit('update:page', $event)"
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
  </B24Pagination>
</template>
