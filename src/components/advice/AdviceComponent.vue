<script lang="ts" setup>

</script>

<template>
  <B24Advice
    v-bind="$attrs"
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
  </B24Advice>
</template>
