<script lang="ts" setup>

</script>

<template>
  <B24ColorModeAvatar
    light=""
    dark=""
    v-bind="$attrs"
  >
    <template
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot :name="slot" v-bind="scope" />
    </template>
  </B24ColorModeAvatar>
</template>
