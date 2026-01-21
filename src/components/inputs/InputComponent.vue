<script lang="ts" setup>
import type { InputModel } from './Input/model';

const props = defineProps<InputModel>();

</script>

<template>
  <B24Input
    v-bind="props"
  />
</template>
