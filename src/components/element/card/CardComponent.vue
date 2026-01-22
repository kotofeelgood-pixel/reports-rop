<script lang="ts" setup>
import type { CardModel } from './model';

const props = defineProps<CardModel>();

defineSlots<{
  default(): any;
  header(): any;
  footer(): any;
}>();

</script>

<template>
  <B24Card
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
  </B24Card>
</template>
