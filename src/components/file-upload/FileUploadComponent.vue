<script lang="ts" setup>
import type { FileUploadModel } from './model';

const props = defineProps<FileUploadModel>();
const modelValue = defineModel<File | File[] | null>('modelValue');

defineEmits<{
  change: [event: Event];
}>();

</script>

<template>
  <B24FileUpload
    v-bind="props"
    v-model="modelValue"
    @change="$emit('change', $event)"
  >
    <template
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot as string"
        v-bind="scope"
      />
    </template>
  </B24FileUpload>
</template>
