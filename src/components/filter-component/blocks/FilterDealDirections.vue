<!-- Блок «3. Выберите направления сделок»: чекбоксы направлений с «Выбрать все». -->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getDealCategories } from '@/api/routes/crm'
import FiltersColumn from '../FiltersColumn.vue'

const props = defineProps<{
  single?: boolean
  hideSelectAll?: boolean
}>()

const isSingle = computed(() => props.single === true)
const showSelectAll = computed(() => !isSingle.value && props.hideSelectAll !== true)

const model = defineModel<string[]>({ default: () => [] })

const categories = ref<{ id: number; name: string }[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const list = await getDealCategories()
    categories.value = list.map((c) => ({ id: c.id, name: c.name }))
  } catch {
    categories.value = []
  } finally {
    loading.value = false
  }
})

const dealItems = computed(() =>
  categories.value.map((c) => ({ value: String(c.id), label: c.name })),
)

const selectAll = computed({
  get: () =>
    categories.value.length > 0 && model.value.length === categories.value.length,
  set: (v: boolean) => {
    model.value = v ? categories.value.map((c) => String(c.id)) : []
  },
})

const handleChange = (values: string[] | string) => {
  const arr = Array.isArray(values) ? values : [values]
  if (!isSingle.value) {
    model.value = arr
  } else {
    const last = arr[arr.length - 1]
    model.value = last ? [last] : []
  }
}
</script>

<template>
  <FiltersColumn title="3. Выберите направления сделок">
    <div class="space-y-2">
      <B24Checkbox v-if="showSelectAll" v-model="selectAll" label="Выбрать все" />
      <B24CheckboxGroup
        v-if="!loading"
        :model-value="model"
        @update:model-value="handleChange"
        :items="dealItems"
        value-key="value"
        label-key="label"
        variant="list"
        orientation="vertical"
      />
      <p v-else class="text-sm text-muted">Загрузка...</p>
    </div>
  </FiltersColumn>
</template>
