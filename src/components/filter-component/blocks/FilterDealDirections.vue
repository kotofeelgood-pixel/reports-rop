<!-- Блок «3. Выберите направления сделок»: чекбоксы направлений с «Выбрать все». -->
<script setup lang="ts">
import { computed } from 'vue'
import { DEAL_DIRECTIONS, type DealDirectionId } from '@/config/dealDirections'
import FiltersColumn from '../FiltersColumn.vue'
const model = defineModel<DealDirectionId[]>({ default: () => [] })

const dealItems = DEAL_DIRECTIONS.map((d) => ({ value: d.id, label: d.label }))
const selectAll = computed({
  get: () => model.value.length === DEAL_DIRECTIONS.length,
  set: (v: boolean) => {
    model.value = v ? [...DEAL_DIRECTIONS.map((d) => d.id)] : []
  },
})
</script>

<template>
  <FiltersColumn title="3. Выберите направления сделок">
    <div class="space-y-2">
      <B24Checkbox v-model="selectAll" label="Выбрать все" />
      <B24CheckboxGroup
        v-model="model"
        :items="dealItems"
        value-key="value"
        label-key="label"
        variant="list"
        orientation="vertical"
      />
    </div>
  </FiltersColumn>
</template>
