<script setup lang="ts">
import TCol from '@/components/t-ui/TCol.vue'
import TCell from '@/components/t-ui/TCell.vue'
import TRow from '@/components/t-ui/TRow.vue'
</script>

<template>
  <div class="report-table-scroll" data-simplebar data-simplebar-auto-hide="false">
    <table>
      <thead>
        <TRow>
          <TCol title="" :colspan="1" />
          <TCol title="📥 Лиды" :colspan="16" />
          <TCol title="💰 Сделки" :colspan="24" />
        </TRow>
        <TRow>
          <!-- Первая колонка -->
          <TCol title="UTM_SOURCE" font-size="12px" />

          <!-- 📥 Лиды -->
          <TCol title="С прошлого периода" font-size="12px" />
          <TCol title="Новые" font-size="12px" class="leading-3" />
          <TCol title="В работе" font-size="12px" class="leading-3" />
          <TCol title="С движениями по статусам" font-size="12px" class="leading-3" />
          <TCol title="Без движений по статусам" font-size="12px" class="leading-3" />
          <TCol title="Брак" font-size="12px" class="leading-3" />
          <TCol title="Цикл брак" font-size="12px" class="leading-3" />
          <TCol title="Конвертированные" font-size="12px" class="leading-3" />
          <TCol title="Цикл конверсии" font-size="12px" class="leading-3" />
          <TCol title="Всего обработано" font-size="12px" class="leading-3" />
          <TCol title="Оставил не закрытыми" font-size="12px" class="leading-3" />
          <TCol title="Дней в работе" font-size="12px" class="leading-3" />
          <TCol title="Общ Конв" font-size="12px" class="leading-3" />
          <TCol title="Брак" font-size="12px" class="leading-3" />
          <TCol title="Успех" font-size="12px" class="leading-3" />
          <TCol title="% Успех" font-size="12px" class="leading-3" />

          <!-- 💰 Сделки -->
          <TCol title="С прошлого периода" font-size="12px" class="leading-3" />
          <TCol title="Новые сделки" font-size="12px" class="leading-3" />
          <TCol title="Всего в работе" font-size="12px" class="leading-3" />
          <TCol title="Потенциал" font-size="12px" class="leading-3" />
          <TCol title="С движениями по стадиям" font-size="12px" class="leading-3" />
          <TCol title="Без движений по стадиям" font-size="12px" class="leading-3" />
          <TCol title="Сделки с отказом" font-size="12px" class="leading-3" />
          <TCol title="Потеряно" font-size="12px" class="leading-3" />
          <TCol title="Цикл отказа" font-size="12px" class="leading-3" />
          <TCol title="Успешные продажи" font-size="12px" class="leading-3" />
          <TCol title="Выручка" font-size="12px" class="leading-3" />
          <TCol title="Средний чек" font-size="12px" class="leading-3" />
          <TCol title="Цикл продажи" font-size="12px" class="leading-3" />
          <TCol title="Доведено до конца" font-size="12px" class="leading-3" />
          <TCol title="Оставил не закрытыми" font-size="12px" class="leading-3" />
          <TCol title="Длительность не закрытых" font-size="12px" class="leading-3" />
          <TCol title="Общая Конверсия" font-size="12px" class="leading-3" />
          <TCol title="Конверсия в отказ" font-size="12px" class="leading-3" />
          <TCol title="Конверсия в продажу" font-size="12px" class="leading-3" />
          <TCol title="Процент успеха" font-size="12px" class="leading-3" />
          <TCol title="О: -Пвп" font-size="12px" class="leading-3" />
          <TCol title="рс: -Н" font-size="12px" class="leading-3" />
          <TCol title="рс: -Вр" font-size="12px" class="leading-3" />
          <TCol title="рм: -Н" font-size="12px" class="leading-3" />
        </TRow>
      </thead>

      <tbody>
        <TRow user-id="yandex" class-name="rowyandex">
          <TCell class="bg-white sticky-first-col"> yandex </TCell>

          <TCell title="yandex - Лиды - Не завершенные с прошлых периодов"> 0 </TCell>
          <TCell title="yandex - Лиды - Созданные за период"> 0 </TCell>
          <TCell title="yandex - Лиды - Всего в работе"> 0 </TCell>

          <TCell title="yandex - Лиды - Смена стадий"> 0 </TCell>
          <TCell title="yandex - Лиды - Без смены стадий"> 0 </TCell>

          <TCell title="yandex - Лиды - Брак"> 0 </TCell>
          <TCell title="yandex - Среднее время жизни бракованных лидов"> 0дн. </TCell>
          <TCell title="yandex - Лиды - Рабочие"> 0 </TCell>
          <TCell title="yandex - Среднее время жизни успешных лидов"> 0дн. </TCell>
          <TCell title="yandex - Лиды - Завершённые"> 0 </TCell>
          <TCell title="yandex - Лиды - Не закрытые до 08.02.2026"> 0 </TCell>
          <TCell title="yandex - Среднее время жизни незакрытых лидов"> 0дн. </TCell>
          <TCell title="yandex - Лиды - Конверсия Всего"> 0.00% </TCell>
          <TCell title="yandex - Лиды - Конверсия Брак"> 0.00% </TCell>
          <TCell title="yandex - Лиды - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="yandex - Лиды - Доля успешных"> 0.00% </TCell>

          <TCell title="yandex - Сделок не завершенных с прошлых периодов"> 11 </TCell>
          <TCell title="yandex - Сделок начатых за период"> 0 </TCell>
          <TCell title="yandex - Сделок в работе"> 11 </TCell>
          <TCell title="yandex - Потенциал (сумма сделок в работе)"> 0 </TCell>

          <TCell title="yandex - Сделки - Смена стадий"> 0 </TCell>
          <TCell title="yandex - Сделки - Без смены стадий"> 11 </TCell>

          <TCell title="yandex - Сделки - Не продал"> 0 </TCell>
          <TCell title="yandex - Потеряно (сумма проваленных сделок)"> 0 </TCell>
          <TCell title="yandex - Среднее время жизни проигранных сделок"> 0дн. </TCell>
          <TCell title="yandex - Сделки - Продал"> 0 </TCell>
          <TCell title="yandex - Выручка (сумма по успешным сделкам)"> 0.00 </TCell>
          <TCell title="yandex - Средний чек (по успешным сделкам)"> 0.00 </TCell>

          <TCell title="yandex - Среднее время жизни успешных сделок"> 0дн. </TCell>
          <TCell title="yandex - Сделки - Завершённые"> 0 </TCell>
          <TCell title="yandex - Сделки - Не закрытые до 08.02.2026"> 11 </TCell>
          <TCell title="yandex - Среднее время жизни незакрытых сделок"> 323дн. </TCell>
          <TCell title="yandex - Сделки - Конверсия Всего"> 0.00% </TCell>
          <TCell title="yandex - Сделки - Конверсия Брак"> 0.00% </TCell>
          <TCell title="yandex - Сделки - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="yandex - Сделки - Доля успешных"> 0.00% </TCell>
          <TCell title="yandex - Сделки в стадии Общая: - Переговоры в процессе"> 0 </TCell>
          <TCell title="yandex - Сделки в стадии разработка сайтов: - Новая"> 0 </TCell>
          <TCell title="yandex - Сделки в стадии разработка сайтов: - В работе"> 0 </TCell>
          <TCell title="yandex - Сделки в стадии разработка мобилок: - Новая"> 0 </TCell>
        </TRow>

        <TRow user-id="-Не заполнено-" class-name="row-Не заполнено-">
          <TCell class="bg-white sticky-first-col"> -Не заполнено- </TCell>

          <TCell title="-Не заполнено- - Лиды - Не завершенные с прошлых периодов"> 314 </TCell>
          <TCell title="-Не заполнено- - Лиды - Созданные за период"> 0 </TCell>
          <TCell title="-Не заполнено- - Лиды - Всего в работе"> 314 </TCell>

          <TCell title="-Не заполнено- - Лиды - Смена стадий"> 0 </TCell>
          <TCell title="-Не заполнено- - Лиды - Без смены стадий"> 314 </TCell>

          <TCell title="-Не заполнено- - Лиды - Брак"> 0 </TCell>
          <TCell title="-Не заполнено- - Среднее время жизни бракованных лидов"> 0дн. </TCell>
          <TCell title="-Не заполнено- - Лиды - Рабочие"> 0 </TCell>
          <TCell title="-Не заполнено- - Среднее время жизни успешных лидов"> 0дн. </TCell>
          <TCell title="-Не заполнено- - Лиды - Завершённые"> 0 </TCell>
          <TCell title="-Не заполнено- - Лиды - Не закрытые до 08.02.2026"> 314 </TCell>
          <TCell title="-Не заполнено- - Среднее время жизни незакрытых лидов"> 240дн. </TCell>
          <TCell title="-Не заполнено- - Лиды - Конверсия Всего"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Лиды - Конверсия Брак"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Лиды - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Лиды - Доля успешных"> 0.00% </TCell>

          <TCell title="-Не заполнено- - Сделок не завершенных с прошлых периодов"> 85 </TCell>
          <TCell title="-Не заполнено- - Сделок начатых за период"> 0 </TCell>
          <TCell title="-Не заполнено- - Сделок в работе"> 85 </TCell>
          <TCell title="-Не заполнено- - Потенциал (сумма сделок в работе)"> 516'170.00 </TCell>

          <TCell title="-Не заполнено- - Сделки - Смена стадий"> 0 </TCell>
          <TCell title="-Не заполнено- - Сделки - Без смены стадий"> 85 </TCell>

          <TCell title="-Не заполнено- - Сделки - Не продал"> 0 </TCell>
          <TCell title="-Не заполнено- - Потеряно (сумма проваленных сделок)"> 0 </TCell>
          <TCell title="-Не заполнено- - Среднее время жизни проигранных сделок"> 0дн. </TCell>
          <TCell title="-Не заполнено- - Сделки - Продал"> 0 </TCell>
          <TCell title="-Не заполнено- - Выручка (сумма по успешным сделкам)"> 0.00 </TCell>
          <TCell title="-Не заполнено- - Средний чек (по успешным сделкам)"> 0.00 </TCell>

          <TCell title="-Не заполнено- - Среднее время жизни успешных сделок"> 0дн. </TCell>
          <TCell title="-Не заполнено- - Сделки - Завершённые"> 0 </TCell>
          <TCell title="-Не заполнено- - Сделки - Не закрытые до 08.02.2026"> 85 </TCell>
          <TCell title="-Не заполнено- - Среднее время жизни незакрытых сделок"> 160дн. </TCell>
          <TCell title="-Не заполнено- - Сделки - Конверсия Всего"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Сделки - Конверсия Брак"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Сделки - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Сделки - Доля успешных"> 0.00% </TCell>
          <TCell title="-Не заполнено- - Сделки в стадии Общая: - Переговоры в процессе"> 0 </TCell>
          <TCell title="-Не заполнено- - Сделки в стадии разработка сайтов: - Новая"> 0 </TCell>
          <TCell title="-Не заполнено- - Сделки в стадии разработка сайтов: - В работе"> 0 </TCell>
          <TCell title="-Не заполнено- - Сделки в стадии разработка мобилок: - Новая"> 0 </TCell>
        </TRow>
      </tbody>

      <tfoot>
        <TRow class-name="row0" user-id="0">
          <TCell class="bg-white sticky-first-col"> ИТОГО </TCell>

          <TCell title="0 - Лиды - Не завершенные с прошлых периодов"> 314 </TCell>
          <TCell title="0 - Лиды - Созданные за период"> 0 </TCell>
          <TCell title="0 - Лиды - Всего в работе"> 314 </TCell>
          <TCell title="0 - Лиды - Смена стадий"> 0 </TCell>
          <TCell title="0 - Лиды - Без смены стадий"> 314 </TCell>
          <TCell title="0 - Лиды - Брак"> 0 </TCell>
          <TCell title="0 - Среднее время жизни бракованных лидов"> 0дн. </TCell>
          <TCell title="0 - Лиды - Рабочие"> 0 </TCell>
          <TCell title="0 - Среднее время жизни успешных лидов"> 0дн. </TCell>
          <TCell title="0 - Лиды - Завершённые"> 0 </TCell>
          <TCell title="0 - Лиды - Не закрытые до 08.02.2026"> 314 </TCell>
          <TCell title="0 - Среднее время жизни незакрытых лидов"> 240дн. </TCell>
          <TCell title="0 - Лиды - Конверсия Всего"> 0.00% </TCell>
          <TCell title="0 - Лиды - Конверсия Брак"> 0.00% </TCell>
          <TCell title="0 - Лиды - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="0 - Лиды - Доля успешных"> 0.00% </TCell>
          <TCell title="0 - Сделок не завершенных с прошлых периодов"> 96 </TCell>
          <TCell title="0 - Сделок начатых за период"> 0 </TCell>
          <TCell title="0 - Сделок в работе"> 96 </TCell>
          <TCell title="0 - Потенциал (сумма сделок в работе)"> 516'170.00 </TCell>
          <TCell title="0 - Сделки - Смена стадий"> 0 </TCell>
          <TCell title="0 - Сделки - Без смены стадий"> 96 </TCell>
          <TCell title="0 - Сделки - Не продал"> 0 </TCell>
          <TCell title="0 - Потеряно (сумма проваленных сделок)"> 0.00 </TCell>
          <TCell title="0 - Среднее время жизни проигранных сделок"> 0дн. </TCell>
          <TCell title="0 - Сделки - Продал"> 0 </TCell>
          <TCell title="0 - Выручка (сумма по успешным сделкам)"> 0.00 </TCell>
          <TCell title="0 - Средний чек (по успешным сделкам)"> 0.00 </TCell>
          <TCell title="0 - Среднее время жизни успешных сделок"> 0дн. </TCell>
          <TCell title="0 - Сделки - Завершённые"> 0 </TCell>
          <TCell title="0 - Сделки - Не закрытые до 08.02.2026"> 96 </TCell>
          <TCell title="0 - Среднее время жизни незакрытых сделок"> 242дн. </TCell>
          <TCell title="0 - Сделки - Конверсия Всего"> 0.00% </TCell>
          <TCell title="0 - Сделки - Конверсия Брак"> 0.00% </TCell>
          <TCell title="0 - Сделки - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="0 - Сделки - Доля успешных"> 0.00% </TCell>
          <TCell title="0 - Сделки в стадии Общая: - Переговоры в процессе"> 0 </TCell>
          <TCell title="0 - Сделки в стадии разработка сайтов: - Новая"> 0 </TCell>
          <TCell title="0 - Сделки в стадии разработка сайтов: - В работе"> 0 </TCell>
          <TCell title="0 - Сделки в стадии разработка мобилок: - Новая"> 0 </TCell>
        </TRow>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.dt-scroll {
  width: 100%;
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: max-content;
  table-layout: fixed;
}

.report-table-scroll {
  padding-bottom: 16px;
}

td,
th {
  border: 1px solid #dee2e6;
  width: 120px;
  max-width: 120px;
  padding: 4px 8px;
  box-sizing: border-box;
  overflow: hidden;
}

thead tr th:first-child,
tbody tr td:first-child,
tfoot tr td:first-child {
  width: 160px;
  max-width: 160px;
}

th {
  white-space: normal;
  text-overflow: unset;
}

.sticky-first-col {
  position: sticky;
  left: 0;
  z-index: 2;
}

thead .sticky-first-col,
tfoot .sticky-first-col {
  z-index: 3;
}

thead tr:nth-child(1) th:first-child,
thead tr:nth-child(2) th:first-child {
  position: sticky;
  left: 0;
  z-index: 4;
  background: #ffffff;
}
</style>
