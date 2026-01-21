<script lang="ts" setup>
import type { SeparatorModel } from './model';

const props = defineProps<SeparatorModel>();

</script>

<template>
  <B24Separator
    v-bind="props"
  >
    <slot />
  </B24Separator>
</template>
