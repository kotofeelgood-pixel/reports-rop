<script lang="ts" setup>

defineEmits<{
  'update:modelValue': [value: string[]];
  complete: [value: string[]];
  change: [event: Event];
  blur: [event: Event];
}>();

</script>

<template>
  <B24PinInput
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @complete="$emit('complete', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
