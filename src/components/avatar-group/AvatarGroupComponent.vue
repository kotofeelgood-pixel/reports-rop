<script lang="ts" setup>
import type { AvatarGroupModel } from './model';

const props = defineProps<AvatarGroupModel>();

</script>

<template>
  <B24AvatarGroup
    v-bind="props"
  >
    <slot />
  </B24AvatarGroup>
</template>
