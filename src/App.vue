<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'

const items: NavigationMenuItem[] = [
  {
    label: 'Главная',
    to: '/',
  },
  {
    label: 'Отчеты',
  },
]

const feedbackForm = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)

const handleSubmitFeedback = async () => {
  if (!feedbackForm.value.message.trim()) {
    return
  }

  try {
    isSubmitting.value = true
    // Здесь можно добавить отправку формы на сервер
    // Например, через fetch / axios
    console.log('Feedback submit', feedbackForm.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <!-- <B24ConfigProvider locale="ru-RU"> -->
  <B24App>
    <B24Card class="mt-4 mx-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4 grow">
          <p class="text-2xl font-bold flex-shrink-0">Отчет Ропа</p>
          <B24NavigationMenu :items="items" class="grow" />
        </div>
        <div class="flex items-center gap-2">
          <B24Modal
            title="Обратная связь"
            description="Поделитесь, пожалуйста, вашими идеями, пожеланиями или сообщите об ошибке в
          отчете."
          >
            <B24Button label="Обратная связь" color="air-primary" />

            <template #body>
              <div class="flex flex-col gap-4 w-[480px] max-w-full">
                <B24Input
                  v-model="feedbackForm.name"
                  label="Имя"
                  placeholder="Как к вам обращаться"
                />

                <B24Input
                  v-model="feedbackForm.email"
                  label="E-mail"
                  placeholder="Для обратной связи (необязательно)"
                />

                <B24Textarea
                  v-model="feedbackForm.message"
                  label="Сообщение"
                  placeholder="Опишите ваш запрос или проблему"
                  rows="4"
                />

                <div class="flex justify-end gap-2 mt-2">
                  <B24Button
                    label="Отправить"
                    color="air-primary"
                    :loading="isSubmitting"
                    :disabled="!feedbackForm.message.trim() || isSubmitting"
                    @click="handleSubmitFeedback"
                  />
                </div>
              </div>
            </template>
          </B24Modal>
          <B24ColorModeButton />
        </div>
      </div>
    </B24Card>
    <RouterView />
  </B24App>
  <!-- </B24ConfigProvider> -->
</template>
