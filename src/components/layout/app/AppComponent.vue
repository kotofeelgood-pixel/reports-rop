<script lang="ts" setup>
import type { AppModel } from './model';

const props = defineProps<AppModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24App
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
  </B24App>
</template>
