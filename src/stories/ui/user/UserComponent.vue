<script lang="ts" setup>
import type { UserModel } from './model';

const props = defineProps<UserModel>();

defineSlots<{
  avatar(): any;
  name(): any;
  description(): any;
  default(): any;
}>();

</script>

<template>
  <B24User
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
  </B24User>
</template>
