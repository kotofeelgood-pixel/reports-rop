<script lang="ts" setup>
import type { ErrorModel } from './model';

const props = defineProps<ErrorModel>();

</script>

<template>
  <B24Error
    v-bind="props"
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
  </B24Error>
</template>
