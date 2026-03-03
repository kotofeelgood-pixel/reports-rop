<!--
  Фильтры для режима «Отчет по запланированным делам».
  Содержит: пользователи/период.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriod :hide-period="true" class="grow" />
  </div>
</template>
