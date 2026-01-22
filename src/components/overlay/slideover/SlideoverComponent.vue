<script lang="ts" setup>

defineEmits<{
  'update:modelValue': [payload: boolean];
}>();

</script>

<template>
  <B24Slideover
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Slideover>
</template>
