<script setup lang="ts">
import type { TabsItem } from '@bitrix24/b24ui-nuxt'
import docsContent from '@/docs/reportDocs.json'

const tabs: TabsItem[] = [
  { label: docsContent.tabs.intro.title, slot: 'intro' },
  { label: docsContent.tabs.start.title, slot: 'start' },
  { label: docsContent.tabs.modes.title, slot: 'modes' },
  { label: docsContent.tabs.filters.title, slot: 'filters' },
  { label: docsContent.tabs.reports.title, slot: 'reports' },
  { label: docsContent.tabs.faq.title, slot: 'faq' },
]

const accordionItems = docsContent.faq.map((item) => ({
  label: item.question,
  content: item.answer,
}))
</script>

<template>
  <div class="help-page">
    <B24Card variant="outline">
      <template #header>
        <h1 class="text-4xl md:text-5xl font-bold mb-2">
          {{ docsContent.header.title }}
        </h1>
        <p class="text-lg md:text-2xl text-gray-700">
          {{ docsContent.header.subtitle }}
        </p>
      </template>

      <h2 class="text-2xl md:text-3xl font-semibold mb-4">
        {{ docsContent.tocTitle }}
      </h2>

      <B24Tabs :items="tabs" class="w-full" size="sm">
        <template #intro>
          <section class="p-4 md:p-6">
            <h2 class="text-2xl md:text-3xl font-semibold my-4">
              {{ docsContent.tabs.intro.title }}
            </h2>
            <p
              v-for="(p, idx) in docsContent.tabs.intro.description"
              :key="idx"
              class="text-base md:text-xl mb-3"
            >
              {{ p }}
            </p>
          </section>
        </template>

        <template #start>
          <section class="p-4 md:p-6">
            <h2 class="text-2xl md:text-3xl font-semibold my-4">
              {{ docsContent.tabs.start.title }}
            </h2>

            <article
              v-for="(section, idx) in docsContent.tabs.start.sections"
              :key="idx"
              class="mb-6"
            >
              <h3 class="text-xl md:text-2xl font-semibold my-3">
                {{ section.title }}
              </h3>
              <p
                v-for="(p, pIdx) in section.paragraphs"
                :key="pIdx"
                class="text-base md:text-xl mb-2"
              >
                {{ p }}
              </p>
              <div v-if="section.list" class="mt-2">
                <p class="text-base md:text-xl mb-2">
                  {{ section.list.title }}
                </p>
                <ul class="space-y-2 list-disc pl-5">
                  <li v-for="(item, lIdx) in section.list.items" :key="lIdx">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </article>
          </section>
        </template>

        <template #modes>
          <section class="p-4 md:p-6">
            <h2 class="text-2xl md:text-3xl font-semibold my-4">
              {{ docsContent.tabs.modes.title }}
            </h2>
            <p
              v-for="(p, idx) in docsContent.tabs.modes.intro"
              :key="idx"
              class="text-base md:text-xl mb-2"
            >
              {{ p }}
            </p>

            <div class="grid md:grid-cols-2 gap-4 mt-4">
              <article
                v-for="mode in docsContent.tabs.modes.modes"
                :key="mode.id"
                class="p-4 border rounded-lg bg-gray-50"
              >
                <h3 class="text-lg md:text-xl font-semibold mb-2">
                  {{ mode.name }}
                </h3>
                <p class="text-base md:text-lg">
                  {{ mode.description }}
                </p>
              </article>
            </div>
          </section>
        </template>

        <template #filters>
          <section class="p-4 md:p-6">
            <h2 class="text-2xl md:text-3xl font-semibold my-4">
              {{ docsContent.tabs.filters.title }}
            </h2>
            <p
              v-for="(p, idx) in docsContent.tabs.filters.intro"
              :key="idx"
              class="text-base md:text-xl mb-2"
            >
              {{ p }}
            </p>

            <article
              v-for="(section, idx) in docsContent.tabs.filters.sections"
              :key="idx"
              class="mt-4"
            >
              <h3 class="text-xl md:text-2xl font-semibold my-3">
                {{ section.title }}
              </h3>
              <p
                v-for="(p, pIdx) in section.paragraphs"
                :key="pIdx"
                class="text-base md:text-xl mb-2"
              >
                {{ p }}
              </p>
            </article>
          </section>
        </template>

        <template #reports>
          <section class="p-4 md:p-6">
            <h2 class="text-2xl md:text-3xl font-semibold my-4">
              {{ docsContent.tabs.reports.title }}
            </h2>

            <article
              v-for="(section, idx) in docsContent.tabs.reports.sections"
              :key="idx"
              class="mb-6"
            >
              <h3 class="text-xl md:text-2xl font-semibold my-3">
                {{ section.title }}
              </h3>
              <p
                v-for="(p, pIdx) in section.paragraphs"
                :key="pIdx"
                class="text-base md:text-xl mb-2"
              >
                {{ p }}
              </p>

              <div v-if="section.list" class="mt-2">
                <p class="text-base md:text-xl mb-2">
                  {{ section.list.title }}
                </p>
                <ul class="space-y-2 list-disc pl-5">
                  <li v-for="(item, lIdx) in section.list.items" :key="lIdx">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </article>
          </section>
        </template>

        <template #faq>
          <section class="p-4 md:p-6">
            <h2 class="text-2xl md:text-3xl font-semibold my-4">
              {{ docsContent.tabs.faq.title }}
            </h2>
            <B24Accordion :items="accordionItems" class="accordion">
              <template #content="{ item }">
                <div class="text-base md:text-xl pb-3">
                  {{ item.content }}
                </div>
              </template>
            </B24Accordion>
          </section>
        </template>
      </B24Tabs>

      <template #footer>
        <section class="p-4 md:p-6">
          <h2 class="text-2xl md:text-3xl font-semibold my-4">
            {{ docsContent.footer.title }}
          </h2>
          <p class="text-base md:text-xl">
            {{ docsContent.footer.text }}
          </p>
        </section>
      </template>
    </B24Card>
  </div>
</template>

<style scoped>
.accordion :deep(span) {
  font-size: 18px;
  font-weight: 600;
}

.accordion :deep(button) {
  padding: 20px 0;
}
</style>

