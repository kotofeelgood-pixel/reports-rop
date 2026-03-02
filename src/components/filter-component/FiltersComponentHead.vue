<script setup lang="ts">
import { ref } from 'vue'

const toggleFilters = ref({
  isOpen: false,
  label: 'Развернуть фильтры',
})

const toggleFiltersHandler = () => {
  toggleFilters.value.isOpen = !toggleFilters.value.isOpen
  toggleFilters.value.label = toggleFilters.value.isOpen ? 'Свернуть фильтры' : 'Развернуть фильтры'
}
</script>

<template>
  <B24Card variant="selection">
    <div class="flex justify-between items-center">
      <div class="space-y-2">
        <p>
          Отчёт РОПа - инструмент регулярного менеджмента для руководителя отдела продаж от компании
          ITCenter.
        </p>
        <B24Button
          label="Инструкция по работе с отчетом"
          size="xs"
          color="air-secondary-accent-1"
        />
      </div>
      <div>
        <B24Button
          :label="toggleFilters.label"
          color="air-primary"
          size="xl"
          @click="toggleFiltersHandler"
        />
      </div>
    </div>
  </B24Card>
</template>

<style scoped></style>
