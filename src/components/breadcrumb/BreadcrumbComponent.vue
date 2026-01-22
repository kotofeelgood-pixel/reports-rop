<script lang="ts" setup>
import type { BreadcrumbModel } from './model';

const props = defineProps<BreadcrumbModel>();

</script>

<template>
  <B24Breadcrumb
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
  </B24Breadcrumb>
</template>
