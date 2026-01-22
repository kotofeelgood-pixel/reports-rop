<script lang="ts" setup>


</script>

<template>
  <B24InputTags
    v-bind="$attrs"
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
  </B24InputTags>
</template>
