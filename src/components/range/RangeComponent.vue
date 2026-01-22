<script lang="ts" setup>

defineEmits<{
  'update:modelValue': [value: number | number[] | undefined];
  change: [event: Event];
}>();

</script>

<template>
  <B24Range
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  />
</template>
