<script setup lang="ts">
const { title, colspan } = defineProps<{
  title: string
  colspan?: number
  fontSize?: string
}>()
</script>

<template>
  <th :colspan="colspan ?? 1" style="text-align: center">
    <div class="p-2">
      <span class="font-semibold" :style="{ fontSize: fontSize ?? '14px' }" v-if="title">
        {{ title }}
      </span>
    </div>
  </th>
</template>

<style scoped></style>
