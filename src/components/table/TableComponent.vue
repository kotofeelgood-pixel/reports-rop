<script lang="ts" setup>
import type { TableModel } from './model';

const props = defineProps<TableModel>();

const globalFilter = defineModel<string>('globalFilter');
const columnFilters = defineModel<Record<string, any>>('columnFilters');
const columnOrder = defineModel<string[]>('columnOrder');
const columnVisibility = defineModel<Record<string, boolean>>('columnVisibility');
const columnPinning = defineModel<Record<string, any>>('columnPinning');
const columnSizing = defineModel<Record<string, any>>('columnSizing');
const columnSizingInfo = defineModel<Record<string, any>>('columnSizingInfo');
const rowSelection = defineModel<Record<string, boolean>>('rowSelection');
const rowPinning = defineModel<Record<string, any>>('rowPinning');
const sorting = defineModel<Array<{ id: string; desc: boolean }>>('sorting');
const grouping = defineModel<string[]>('grouping');
const expanded = defineModel<Record<string, boolean>>('expanded');
const pagination = defineModel<Record<string, any>>('pagination');

</script>

<template>
  <B24Table
    v-bind="props"
    v-model:global-filter="globalFilter"
    v-model:column-filters="columnFilters"
    v-model:column-order="columnOrder"
    v-model:column-visibility="columnVisibility"
    v-model:column-pinning="columnPinning"
    v-model:column-sizing="columnSizing"
    v-model:column-sizing-info="columnSizingInfo"
    v-model:row-selection="rowSelection"
    v-model:row-pinning="rowPinning"
    v-model:sorting="sorting"
    v-model:grouping="grouping"
    v-model:expanded="expanded"
    v-model:pagination="pagination"
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
  </B24Table>
</template>
