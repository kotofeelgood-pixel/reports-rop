<script lang="ts" setup>
import type { BannerModel } from './model';

const props = defineProps<BannerModel>();

defineEmits<{
  close: [];
}>();

</script>

<template>
  <B24Banner
    v-bind="props"
    @close="$emit('close')"
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
  </B24Banner>
</template>
