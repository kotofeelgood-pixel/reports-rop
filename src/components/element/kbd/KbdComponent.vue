<script lang="ts" setup>
import type { KbdModel } from './model';

const props = defineProps<KbdModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24Kbd
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
  </B24Kbd>
</template>
