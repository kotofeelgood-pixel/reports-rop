<script lang="ts" setup>
import type { AdviceModel } from './model';

const props = defineProps<AdviceModel>();

</script>

<template>
  <B24Advice
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
  </B24Advice>
</template>
