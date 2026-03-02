<!--
  Фильтры для режима «Отчёт по пропущенным звонкам».
  Содержит: пользователи/период, настройки перезвона (успешные, мин. секунд).
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterMissedCallsSettings from '../blocks/FilterMissedCallsSettings.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <FilterUsersPeriod />
    <FilterMissedCallsSettings />
  </div>
</template>
