<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelValue = defineModel<any>('modelValue');

</script>

<template>
  <B24InputMenu
    v-bind="$attrs"
    v-model="modelValue"
  >
  </B24InputMenu>
</template>
