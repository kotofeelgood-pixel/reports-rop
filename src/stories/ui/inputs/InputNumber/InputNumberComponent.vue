<script lang="ts" setup>
import type { InputNumberModel } from './model';

defineProps<InputNumberModel>();
const modelValue = defineModel<number>('modelValue');

</script>

<template>
  <B24InputNumber
    v-bind="$attrs"
    v-model="modelValue"
  />
</template>
