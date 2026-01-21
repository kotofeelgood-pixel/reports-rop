<script lang="ts" setup>
import type { AvatarModel } from './model';

const props = defineProps<AvatarModel>();

</script>

<template>
  <B24Avatar
    v-bind="props"
  />
</template>
