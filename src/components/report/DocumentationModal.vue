<script setup lang="ts">
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

const model = defineModel<boolean>('open', { default: false })
</script>

<template>
  <ModalComponent
    v-model:open="model"
    title="Документация"
    description="Руководство по использованию приложения для анализа звонков"
    overlay
    modal
    :close="true"
    class="max-w-4xl"
  >
    <template #body>
      <div class="max-h-[70vh] min-h-[200px] space-y-6 overflow-y-auto bg-white px-4 py-4 pr-2 text-gray-900 dark:bg-[#252525] dark:text-gray-100">
        <!-- Введение -->
        <section class="text-left">
          <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Введение</h2>
          <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Приложение для анализа звонков позволяет отслеживать статистику звонков сотрудников, анализировать их активность и эффективность работы. 
            Система интегрирована с Bitrix24 и автоматически получает данные о звонках из телефонии.
          </p>
        </section>

        <!-- Раздел "Отчет" -->
        <section>
          <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Раздел "Отчет"</h2>
          
          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Таблица пользователей</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Основная таблица отображает статистику звонков по каждому сотруднику за выбранный период:
          </p>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>ОТВЕТСТВЕННЫЙ</strong> — имя сотрудника с аватаром. Клик по имени открывает профиль в Bitrix24</li>
            <li><strong>ИСХ.</strong> — количество исходящих звонков (зелёный индикатор)</li>
            <li><strong>ВХОД.</strong> — количество входящих звонков (голубой индикатор)</li>
            <li><strong>ПР.</strong> — количество пропущенных входящих звонков (красный индикатор)</li>
            <li><strong>ДЛИТЕЛЬНОСТЬ</strong> — общая длительность всех звонков сотрудника</li>
          </ul>
          
          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Фильтры</h3>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>Дата</strong> — выбор периода для анализа. Доступны предустановленные периоды (сегодня, вчера, неделя, месяц) или произвольный диапазон через календарь</li>
            <li><strong>Пользователи</strong> — фильтрация по конкретным сотрудникам. Можно выбрать несколько пользователей или оставить "Все пользователи"</li>
          </ul>
          
          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Взаимодействие с таблицей</h3>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Клик по заголовку колонки сортирует данные по этому параметру (повторный клик меняет направление сортировки)</li>
            <li>Клик по числу в колонках "ИСХ.", "ВХОД." или "ПР." открывает детальный список звонков этого типа для выбранного сотрудника</li>
            <li>Клик по итоговым значениям внизу таблицы открывает список всех звонков выбранного типа за период</li>
            <li>В календаре выбора даты отображаются цветные точки, показывающие активность по дням (зелёные — исходящие, голубые — входящие, красные — пропущенные)</li>
          </ul>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">График</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            График показывает динамику звонков по дням выбранного периода с разбивкой по типам:
          </p>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li><span class="inline-block size-3 rounded-full bg-green-400"></span> Исходящие звонки</li>
            <li><span class="inline-block size-3 rounded-full bg-[#2fc6f6]"></span> Входящие звонки</li>
            <li><span class="inline-block size-3 rounded-full bg-red-500"></span> Пропущенные звонки</li>
            <li><span class="inline-block size-3 rounded-full bg-orange-500"></span> Обработанные пропущенные звонки</li>
          </ul>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Рейтинг сотрудников</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Блок показывает топ-5 сотрудников по двум показателям:
          </p>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>Совершенные звонки</strong> — сотрудники с наибольшим количеством исходящих звонков</li>
            <li><strong>Пропущенные</strong> — сотрудники с наибольшим количеством пропущенных входящих звонков</li>
          </ul>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Клик по сотруднику в рейтинге открывает детальный список его звонков соответствующего типа.
          </p>
        </section>

        <!-- Раздел "Аналитика" -->
        <section>
          <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Раздел "Аналитика"</h2>
          
          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Звонки по часам</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            График показывает распределение звонков по часам суток. Помогает определить пиковые часы активности и периоды низкой нагрузки.
            Тип графика (линейный или гистограмма) можно изменить в настройках.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Соотношение по типам</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Круговая диаграмма показывает процентное соотношение исходящих, входящих и пропущенных звонков за выбранный период.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Звонки по дням</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            График показывает динамику общего количества звонков по дням выбранного периода. При длинных периодах график прокручивается горизонтально.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Топ сотрудников</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Гистограмма показывает топ-10 сотрудников по общему количеству звонков за период.
          </p>
        </section>

        <!-- Детальный просмотр звонков -->
        <section>
          <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Детальный просмотр звонков</h2>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            При клике на число звонков открывается модальное окно со списком всех звонков выбранного типа. В таблице отображается:
          </p>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>ВРЕМЯ</strong> — дата и время начала звонка</li>
            <li><strong>НОМЕР</strong> — телефонный номер абонента</li>
            <li><strong>ТИП</strong> — тип звонка (исходящий/входящий)</li>
            <li><strong>ДЛИТ.</strong> — длительность звонка</li>
            <li><strong>CRM</strong> — связанная сущность из CRM (сделка, контакт, компания и т.д.)</li>
            <li><strong>Запись</strong> — кнопка воспроизведения аудиозаписи звонка (если доступна)</li>
          </ul>
          
          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Воспроизведение записей</h3>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Клик по кнопке воспроизведения открывает аудиоплеер внизу модального окна</li>
            <li>Доступны функции: пауза/воспроизведение, перемотка, изменение скорости воспроизведения (1x, 1.25x, 1.5x, 2x)</li>
            <li>Автопереход к следующей записи после окончания текущей (опционально)</li>
            <li>Навигация между записями с помощью кнопок "Предыдущая" и "Следующая"</li>
            <li>Экспорт списка звонков в Excel через кнопку "Экспорт в Excel"</li>
          </ul>
        </section>

        <!-- Настройки -->
        <section>
          <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Настройки</h2>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Откройте настройки, нажав на иконку шестерёнки в правом верхнем углу. Доступны следующие параметры:
          </p>
          
          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Диапазон графика</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Установите начальный и конечный час для отображения графика "Звонки по часам" в разделе "Аналитика". 
            По умолчанию отображаются все 24 часа.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Тип графика</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Выберите тип отображения графика "Звонки по часам": линейный график или гистограмма.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Расположение блоков</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Настройте расположение элементов на странице "Отчет":
          </p>
          <ul class="mb-4 ml-6 list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li><strong>Столбцы</strong> — таблица слева, график и рейтинг справа</li>
            <li><strong>Строки</strong> — таблица сверху, график и рейтинг снизу</li>
          </ul>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Исключить отдел</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Выберите отдел, сотрудники которого будут исключены из всех отчётов и аналитики.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Исключить сотрудников</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Выберите одного или нескольких сотрудников, которые будут исключены из отчётов. Полезно для исключения тестовых аккаунтов или сотрудников на удалённой работе.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Минимальная длительность звонка</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Установите минимальную длительность звонка в секундах. Звонки короче этого значения не будут учитываться в статистике. 
            Это помогает исключить случайные или неудачные соединения. Диапазон: 0-600 секунд.
          </p>

          <h3 class="mb-2 text-base font-medium text-gray-800 dark:text-gray-200">Тёмная тема</h3>
          <p class="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Переключите интерфейс между светлой и тёмной темой для комфортной работы в любое время суток.
          </p>
        </section>

        <!-- Советы по использованию -->
        <section>
          <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Советы по использованию</h2>
          <ul class="mb-4 ml-6 list-disc space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>Используйте фильтры по дате и пользователям для анализа конкретных периодов и сотрудников</li>
            <li>Регулярно проверяйте раздел "Аналитика" для выявления трендов и паттернов в работе</li>
            <li>Обращайте внимание на рейтинг пропущенных звонков — это помогает выявить проблемы с обработкой входящих звонков</li>
            <li>Настройте минимальную длительность звонка для более точной статистики, исключив короткие неудачные соединения</li>
            <li>Используйте экспорт в Excel для детального анализа данных вне приложения</li>
            <li>Прослушивание записей звонков помогает оценить качество обслуживания клиентов</li>
          </ul>
        </section>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <ButtonComponent
          variant="primary"
          class="px-4"
          @click="model = false"
        >
          Закрыть
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>
