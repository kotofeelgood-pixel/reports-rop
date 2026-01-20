<script lang="ts" setup>
import type { ButtonModel } from './model';

const props = defineProps<ButtonModel>();

</script>

<template>
  <B24Button
    v-bind="props"
    @click="$emit('click')"
  >
    {{ props.label }}
  </B24Button>
</template>
