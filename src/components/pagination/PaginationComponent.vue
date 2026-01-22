<script lang="ts" setup>

defineEmits<{
  'update:page': [value: number];
}>();

</script>

<template>
  <B24Pagination
    v-bind="$attrs"
    @update:page="$emit('update:page', $event)"
  >
    <template
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24Pagination>
</template>
