<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()

defineEmits<{
  'update:page': [value: number];
}>();

</script>

<template>
  <B24Pagination
    v-bind="$attrs"
    @update:page="$emit('update:page', $event)"
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
  </B24Pagination>
</template>
