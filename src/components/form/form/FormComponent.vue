<script lang="ts" setup>
import type { FormModel } from './model';

const props = defineProps<FormModel>();

defineSlots<{
  default(): any;
}>();

defineEmits<{
  submit: [event: Event];
  invalid: [event: Event];
}>();

</script>

<template>
  <B24Form
    v-bind="props"
    @submit="$emit('submit', $event)"
    @invalid="$emit('invalid', $event)"
  >
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24Form>
</template>
