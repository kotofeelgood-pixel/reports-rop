<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
const slotNames = Object.keys(slots) as string[];

</script>

<template>
  <B24PageLinks
    v-bind="$attrs"
  >
    <template
      v-for="slot in slotNames"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24PageLinks>
</template>
