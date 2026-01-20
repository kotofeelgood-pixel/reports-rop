<script lang="ts" setup>
import type { InputModel } from './model';
import { computed } from 'vue';

const props = defineProps<InputModel>();

const inputProps = computed(() => {
  // Для типа "file" нельзя устанавливать value/modelValue
  if (props.type === 'file') {
    const { modelValue, defaultValue, ...rest } = props;
    return rest;
  }
  
  return props;
});

</script>

<template>
  <B24Input
    v-bind="inputProps"
  />
</template>
