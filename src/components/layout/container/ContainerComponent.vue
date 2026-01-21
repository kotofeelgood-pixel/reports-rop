<script lang="ts" setup>
import type { ContainerModel } from './model';

const props = defineProps<ContainerModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24Container
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
  </B24Container>
</template>
