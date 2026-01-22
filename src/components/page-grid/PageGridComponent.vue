<script lang="ts" setup>
import type { PageGridModel } from './model';

const props = defineProps<PageGridModel>();

</script>

<template>
  <B24PageGrid
    v-bind="props"
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
  </B24PageGrid>
</template>
