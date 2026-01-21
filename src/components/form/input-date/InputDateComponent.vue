<script lang="ts" setup>


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelValue = defineModel<any>('modelValue');


</script>

<template>
  <B24InputDate v-bind="$attrs" v-model="modelValue"/>
</template>
