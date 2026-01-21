<script lang="ts" setup>
import type { ColorModeSwitchModel } from './model';

const props = defineProps<ColorModeSwitchModel>();
const modelValue = defineModel<boolean>('modelValue');

</script>

<template>
  <B24ColorModeSwitch
    v-bind="props"
    v-model="modelValue"
  />
</template>
