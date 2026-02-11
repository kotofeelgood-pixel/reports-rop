<script lang="ts" setup>
import { computed } from 'vue'
// B24Avatar показывает инициалы из alt при отсутствии фото или ошибке загрузки
const props = withDefaults(
  defineProps<{ name?: string; alt?: string }>(),
  {}
)
const alt = computed(() => props.alt ?? props.name ?? '')
</script>

<template>
  <B24Avatar
    v-bind="$attrs"
    :alt="alt"
  />
</template>
