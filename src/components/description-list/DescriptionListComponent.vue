<script lang="ts" setup>
import type { DescriptionListModel } from './model';

const props = defineProps<DescriptionListModel>();

</script>

<template>
  <B24DescriptionList
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
  </B24DescriptionList>
</template>
