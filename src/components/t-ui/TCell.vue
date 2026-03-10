<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const { tag, bg } = defineProps<{
  tag?: 'td' | 'th'
  bg?: string
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag ?? 'td'"
    :style="bg ? { backgroundColor: bg } : undefined"
    @click="handleClick"
    class="p-4 text-center"
  >
    <slot />
  </component>
</template>

<style scoped></style>
