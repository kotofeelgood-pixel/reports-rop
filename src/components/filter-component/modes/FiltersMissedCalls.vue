<!--
  Фильтры для режима «Отчёт по пропущенным звонкам».
  Содержит: пользователи/период, настройки перезвона (успешные, мин. секунд).
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterMissedCallsSettings from '../blocks/FilterMissedCallsSettings.vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriod class="grow" />
    <FilterMissedCallsSettings class="grow" />
  </div>
</template>
