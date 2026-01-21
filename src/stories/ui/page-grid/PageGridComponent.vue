<script lang="ts" setup>
import type { PageGridModel } from './model';

const props = defineProps<PageGridModel>();

</script>

<template>
  <B24PageGrid
    v-bind="props"
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
  </B24PageGrid>
</template>
