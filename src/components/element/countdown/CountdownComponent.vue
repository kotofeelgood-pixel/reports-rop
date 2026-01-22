<script lang="ts" setup>
import type { CountdownModel } from './model';

const props = defineProps<CountdownModel>();

defineSlots<{
  default(): any;
}>();

defineEmits<{
  finish: [];
}>();

</script>

<template>
  <B24Countdown
    v-bind="props"
    @finish="$emit('finish')"
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
  </B24Countdown>
</template>
