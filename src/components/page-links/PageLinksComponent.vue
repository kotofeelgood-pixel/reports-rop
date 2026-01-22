<script lang="ts" setup>
import type { PageLinksModel } from './model';

const props = defineProps<PageLinksModel>();

</script>

<template>
  <B24PageLinks
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
  </B24PageLinks>
</template>
