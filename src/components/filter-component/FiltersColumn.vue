<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <B24Card variant="outline">
    <template #header>{{ title }}</template>
    <B24ScrollArea class="max-h-[600px]">
      <slot />
    </B24ScrollArea>
  </B24Card>
</template>

<style scoped></style>
