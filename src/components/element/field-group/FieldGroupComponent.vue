<script lang="ts" setup>
import type { FieldGroupModel } from './model';

const props = defineProps<FieldGroupModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24FieldGroup
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
  </B24FieldGroup>
</template>
