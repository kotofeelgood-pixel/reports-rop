<!--
  Фильтры для режима «Отчет по запланированным делам».
  Содержит: пользователи/период.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <FilterUsersPeriod />
  </div>
</template>
