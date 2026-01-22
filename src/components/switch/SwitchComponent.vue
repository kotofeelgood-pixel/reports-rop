<script lang="ts" setup>
import type { SwitchModel } from './model';

const props = defineProps<SwitchModel>();
const modelValue = defineModel<boolean>('modelValue');

defineEmits<{
  'update:modelValue': [value: boolean];
  change: [event: Event];
}>();

</script>

<template>
  <B24Switch
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Switch>
</template>
