<script lang="ts" setup>
import type { ErrorModel } from './model';

const props = defineProps<ErrorModel>();

</script>

<template>
  <B24Error
    v-bind="props"
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
  </B24Error>
</template>
