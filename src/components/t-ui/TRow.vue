<script setup lang="ts">
const { className, userId } = defineProps<{
  className?: string
  userId?: string | number
}>()
</script>

<template>
  <tr :class="className" :data-userid="userId">
    <slot />
  </tr>
</template>

<style scoped></style>
