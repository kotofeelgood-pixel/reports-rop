<script lang="ts" setup>
import type { AlertModel } from './model';

const props = defineProps<AlertModel>();
const open = defineModel<boolean>('open', { default: true });

</script>

<template>
  <B24Alert
    v-bind="props"
    v-model:open="open"
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
  </B24Alert>
</template>
