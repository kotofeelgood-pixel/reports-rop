<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()

defineEmits<{
  'update:modelValue': [payload: boolean];
}>();

</script>

<template>
  <B24Slideover
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template
      v-for="(_, slot) in slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24Slideover>
</template>
