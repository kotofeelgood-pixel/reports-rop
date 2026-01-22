<script lang="ts" setup>
import type { ProgressModel } from './model';

const props = defineProps<ProgressModel>();
const modelValue = defineModel<number | null>('modelValue');

</script>

<template>
  <B24Progress
    v-bind="props"
    v-model="modelValue"
  >
    <template
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot as string"
        v-bind="scope"
      />
    </template>
  </B24Progress>
</template>
