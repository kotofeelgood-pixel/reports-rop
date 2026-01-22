<script lang="ts" setup>

</script>

<template>
  <B24Checkbox
    v-bind="$attrs"
  >
    <template v-if="$slots.label" #label="slotProps">
      <slot name="label" v-bind="slotProps" />
    </template>
    <template v-if="$slots.description" #description="slotProps">
      <slot name="description" v-bind="slotProps" />
    </template>
  </B24Checkbox>
</template>
