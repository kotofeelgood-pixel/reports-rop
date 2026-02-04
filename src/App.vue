<script setup lang="ts">
import { RouterView } from 'vue-router'
import NotifyToaster from '@/components/notify/NotifyToaster.vue'
</script>

<template>
  <B24ConfigProvider locale="ru-RU">
    <B24App>
      <RouterView />
      <NotifyToaster />
    </B24App>
  </B24ConfigProvider>
</template>

