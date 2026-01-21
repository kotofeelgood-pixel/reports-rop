<script lang="ts" setup>
import type { ColorModeAvatarModel } from './model';

const props = defineProps<ColorModeAvatarModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24ColorModeAvatar
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
  </B24ColorModeAvatar>
</template>
