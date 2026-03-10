<script setup lang="ts">
//  Отчет по отделу продаж (Таблица)
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
          <TCol title="Звонки входящие" :colspan="7" />
          <TCol title="Звонки исходящие" :colspan="7" />
          <TCol title="Лиды" :colspan="16" />
          <TCol title="Сделки" :colspan="24" />
        </TRow>
        <!-- -------------------Первая линия заголовка -->
        <TRow>
          <!-- Звонки входящие -->
          <TCol title="Менеджер" class="leading-3" font-size="12px" />
          <TCol title="Пропустил" class="leading-3" font-size="12px" />
          <TCol title="Поговорил" class="leading-3" font-size="12px" />
          <TCol title="Результативно" class="leading-3" font-size="12px" />
          <TCol title="Процент результативных" class="leading-3" font-size="12px" />
          <TCol title="Длительность" class="leading-3" font-size="12px" />
          <TCol title="Длительность результативных" class="leading-3" font-size="12px" />
          <TCol title="Средняя длительность" class="leading-3" font-size="12px" />
          <!-- Звонки исходящие -->
          <TCol title="Не дозвонился" class="leading-3" font-size="12px" />
          <TCol title="Дозвонился" class="leading-3" font-size="12px" />
          <TCol title="Результативно" class="leading-3" font-size="12px" />
          <TCol title="Процент результативных" class="leading-3" font-size="12px" />
          <TCol title="Длительность результативных" class="leading-3" font-size="12px" />
          <TCol title="Средняя длительность" class="leading-3" font-size="12px" />
          <!-- Звонки Лиды -->
          <TCol title="С прошлого периода" class="leading-3" font-size="12px" />
          <TCol title="Новые" class="leading-3" font-size="12px" />
          <TCol title="В работе" class="leading-3" font-size="12px" />
          <TCol title="С движениями по статусам" class="leading-3" font-size="12px" />
          <TCol title="Без движения по статусам" class="leading-3" font-size="12px" />
          <TCol title="Брак" class="leading-3" font-size="12px" />
          <TCol title="Цикл брако" class="leading-3" font-size="12px" />
          <TCol title="Конвертированные" class="leading-3" font-size="12px" />
          <TCol title="Цикл конверсии" class="leading-3" font-size="12px" />
          <TCol title="Всего обработано" class="leading-3" font-size="12px" />
          <TCol title="Оставил не закрытыми" class="leading-3" font-size="12px" />
          <TCol title="Дней в работе" class="leading-3" font-size="12px" />
          <TCol title="Общая конверсия" class="leading-3" font-size="12px" />
          <TCol title="Брак" class="leading-3" font-size="12px" />
          <TCol title="Успех" class="leading-3" font-size="12px" />
          <TCol title="% Успех" class="leading-3" font-size="12px" />
          <!-- Звонки Лиды -->
          <TCol title="С прошлого периода" class="leading-3" font-size="12px" />
          <TCol title="Новые" class="leading-3" font-size="12px" />
          <TCol title="В работе" class="leading-3" font-size="12px" />
          <TCol title="Потенциал" class="leading-3" font-size="12px" />
          <TCol title="С движениями по стадиям" class="leading-3" font-size="12px" />
          <TCol title="Без движения по стадиям" class="leading-3" font-size="12px" />
          <TCol title="Сделки с отказом" class="leading-3" font-size="12px" />
          <TCol title="Потеряно" class="leading-3" font-size="12px" />
          <TCol title="Цикл отказа" class="leading-3" font-size="12px" />
          <TCol title="Успешные продажи" class="leading-3" font-size="12px" />
          <TCol title="Выручка" class="leading-3" font-size="12px" />
          <TCol title="Средний чек" class="leading-3" font-size="12px" />
          <TCol title="Цикл продажи" class="leading-3" font-size="12px" />
          <TCol title="Доведено до конца" class="leading-3" font-size="12px" />
          <TCol title="Оставил не закрытыми" class="leading-3" font-size="12px" />
          <TCol title="Длительность не закрытых" class="leading-3" font-size="12px" />
          <TCol title="Общая конверсия" class="leading-3" font-size="12px" />
          <TCol title="Конверсия в отказ" class="leading-3" font-size="12px" />
          <TCol title="Конверсия в продажу" class="leading-3" font-size="12px" />
          <TCol title="Процент успеха" class="leading-3" font-size="12px" />
          <TCol title="О: -Пвп" class="leading-3" font-size="12px" />
          <TCol title="рс: -Н" class="leading-3" font-size="12px" />
          <TCol title="рс: -Вр" class="leading-3" font-size="12px" />
          <TCol title="рм: -Н" class="leading-3" font-size="12px" />
        </TRow>
      </thead>

      <tbody>
        <TRow user-id="812">
          <TCell class="bg-white sticky-first-col">
            <a href="//itsolutions.bitrix24.ru/company/personal/user/812/" target="_blank"
              >Котенко Виктор</a
            >
          </TCell>

          <TCell title="Котенко Виктор - Пропущенные звонки"> 0 </TCell>
          <TCell title="Котенко Виктор - Успешные звонки за период"> 0 </TCell>
          <TCell
            title="Котенко Виктор - Успешные звонки за период, с длительностью больше фильтра Результативные звонки"
          >
            0
          </TCell>
          <TCell title="Котенко Виктор - Результативных от успешных"> 0% </TCell>
          <TCell title="Котенко Виктор - Сумма времени всех входящих вызовов" data-order="0">
            0
          </TCell>
          <TCell
            title="Котенко Виктор - Сумма времени всех результативных входящих вызовов"
            data-order="0"
          >
            0
          </TCell>
          <TCell
            title="Котенко Виктор - Средняя длительность всех успешных входящих вызовов"
            data-order="0"
          >
            0
          </TCell>

          <TCell title="Котенко Виктор - Недозвон"> 0 </TCell>
          <TCell title="Котенко Виктор - Успешные исходящие звонки за период"> 0 </TCell>
          <TCell
            title="Котенко Виктор - Успешные звонки за период, с длительностью больше фильтра Результативные звонки"
          >
            0
          </TCell>
          <TCell title="Котенко Виктор - Результативных от успешных"> 0% </TCell>
          <TCell title="Котенко Виктор - Сумма времени всех исходящих вызовов"> 0 </TCell>
          <TCell
            title="Котенко Виктор - Сумма времени всех результативных исходящих вызовов"
            data-order="0"
          >
            0
          </TCell>
          <TCell title="Котенко Виктор - Средняя длительность всех успешных исходящих вызовов">
            0
          </TCell>

          <TCell title="Котенко Виктор - Лиды - Не завершенные с прошлых периодов"> 0 </TCell>
          <TCell title="Котенко Виктор - Лиды - Созданные за период"> 0 </TCell>
          <TCell title="Котенко Виктор - Лиды - Всего в работе"> 0 </TCell>

          <TCell title="Котенко Виктор - Лиды - Смена стадий"> 0 </TCell>
          <TCell title="Котенко Виктор - Лиды - Без смены стадий"> 0 </TCell>

          <TCell title="Котенко Виктор - Лиды - Брак" class="L dt-type-numeric" data-key="L_B">
            0
          </TCell>
          <TCell title="Котенко Виктор - Среднее время жизни бракованных лидов"> 0дн. </TCell>
          <TCell title="Котенко Виктор - Лиды - Рабочие"> 0 </TCell>
          <TCell title="Котенко Виктор - Среднее время жизни успешных лидов"> 0дн. </TCell>
          <TCell title="Котенко Виктор - Лиды - Завершённые"> 0 </TCell>
          <TCell title="Котенко Виктор - Лиды - Не закрытые до 08.02.2026"> 0 </TCell>
          <TCell title="Котенко Виктор - Среднее время жизни незакрытых лидов"> 0дн. </TCell>
          <TCell title="Котенко Виктор - Лиды - Конверсия Всего"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Лиды - Конверсия Брак"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Лиды - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Лиды - Доля успешных"> 0.00% </TCell>

          <TCell title="Котенко Виктор - Сделок не завершенных с прошлых периодов"> 0 </TCell>
          <TCell title="Котенко Виктор - Сделок начатых за период"> 0 </TCell>
          <TCell title="Котенко Виктор - Сделок в работе"> 0 </TCell>
          <TCell title="Котенко Виктор - Потенциал (сумма сделок в работе)"> 0 </TCell>

          <TCell title="Котенко Виктор - Сделки - Смена стадий"> 0 </TCell>
          <TCell title="Котенко Виктор - Сделки - Без смены стадий"> 0 </TCell>

          <TCell title="Котенко Виктор - Сделки - Не продал"> 0 </TCell>
          <TCell title="Котенко Виктор - Потеряно (сумма проваленных сделок)"> 0 </TCell>
          <TCell title="Котенко Виктор - Среднее время жизни проигранных сделок"> 0дн. </TCell>
          <TCell title="Котенко Виктор - Сделки - Продал"> 0 </TCell>
          <TCell title="Котенко Виктор - Выручка (сумма по успешным сделкам)"> 0.00 </TCell>
          <TCell title="Котенко Виктор - Средний чек (по успешным сделкам)"> 0.00 </TCell>

          <TCell title="Котенко Виктор - Среднее время жизни успешных сделок"> 0дн. </TCell>
          <TCell title="Котенко Виктор - Сделки - Завершённые"> 0 </TCell>
          <TCell title="Котенко Виктор - Сделки - Не закрытые до 08.02.2026"> 0 </TCell>
          <TCell title="Котенко Виктор - Среднее время жизни незакрытых сделок"> 0дн. </TCell>
          <TCell title="Котенко Виктор - Сделки - Конверсия Всего"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Сделки - Конверсия Брак"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Сделки - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Сделки - Доля успешных"> 0.00% </TCell>
          <TCell title="Котенко Виктор - Сделки в стадии Общая: - Переговоры в процессе"> 0 </TCell>
          <TCell title="Котенко Виктор - Сделки в стадии разработка сайтов: - Новая"> 0 </TCell>
          <TCell title="Котенко Виктор - Сделки в стадии разработка сайтов: - В работе"> 0 </TCell>
        </TRow>
      </tbody>
      <tfoot>
        <TRow class-name="row0" user-id="0">
          <TCell class="bg-white sticky-first-col"> ИТОГО </TCell>
          <TCell title="ИТОГО - Пропущенные звонки"> 0 </TCell>
          <TCell title="ИТОГО - Успешные звонки за период"> 0 </TCell>
          <TCell
            title="ИТОГО - Успешные звонки за период, с длительностью больше фильтра Результативные звонки"
          >
            0
          </TCell>
          <TCell title="ИТОГО - Результативных от успешных"> 0.00% </TCell>
          <TCell title="ИТОГО - Сумма времени всех входящих вызовов"> 0м. 0с. </TCell>
          <TCell title="ИТОГО - Сумма времени всех результативных входящих вызовов">
            0м. 0с.
          </TCell>
          <TCell title="ИТОГО - Средняя длительность всех успешных входящих вызовов"> 0 </TCell>
          <TCell title="ИТОГО - Недозвон"> 0 </TCell>
          <TCell title="ИТОГО - Успешные исходящие звонки за период"> 0 </TCell>
          <TCell
            title="ИТОГО - Успешные звонки за период, с длительностью больше фильтра Результативные звонки"
          >
            0
          </TCell>
          <TCell title="ИТОГО - Результативных от успешных"> 0.00% </TCell>
          <TCell title="ИТОГО - Сумма времени всех исходящих вызовов"> 0м. 0с. </TCell>
          <TCell title="ИТОГО - Сумма времени всех результативных исходящих вызовов">
            0м. 0с.
          </TCell>
          <TCell title="ИТОГО - Средняя длительность всех успешных исходящих вызовов"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Не завершенные с прошлых периодов"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Созданные за период"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Всего в работе"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Смена стадий"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Без смены стадий"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Брак"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни бракованных лидов"> 0дн. </TCell>
          <TCell title="ИТОГО - Лиды - Рабочие"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни успешных лидов"> 0дн. </TCell>
          <TCell title="ИТОГО - Лиды - Завершённые"> 0 </TCell>
          <TCell title="ИТОГО - Лиды - Не закрытые до 08.02.2026"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни незакрытых лидов"> 0дн. </TCell>
          <TCell title="ИТОГО - Лиды - Конверсия Всего"> 0.00% </TCell>
          <TCell title="ИТОГО - Лиды - Конверсия Брак"> 0.00% </TCell>
          <TCell title="ИТОГО - Лиды - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="ИТОГО - Лиды - Доля успешных"> 0.00% </TCell>
          <TCell title="ИТОГО - Сделок не завершенных с прошлых периодов"> 0 </TCell>
          <TCell title="ИТОГО - Сделок начатых за период"> 0 </TCell>
          <TCell title="ИТОГО - Сделок в работе"> 0 </TCell>
          <TCell title="ИТОГО - Потенциал (сумма сделок в работе)"> 0.00 </TCell>
          <TCell title="ИТОГО - Сделки - Смена стадий"> 0 </TCell>
          <TCell title="ИТОГО - Сделки - Без смены стадий"> 0 </TCell>
          <TCell title="ИТОГО - Сделки - Не продал"> 0 </TCell>
          <TCell title="ИТОГО - Потеряно (сумма проваленных сделок)"> 0.00 </TCell>
          <TCell title="ИТОГО - Среднее время жизни проигранных сделок"> 0дн. </TCell>
          <TCell title="ИТОГО - Сделки - Продал"> 0 </TCell>
          <TCell title="ИТОГО - Выручка (сумма по успешным сделкам)"> 0.00 </TCell>
          <TCell title="ИТОГО - Средний чек (по успешным сделкам)"> 0.00 </TCell>
          <TCell title="ИТОГО - Среднее время жизни успешных сделок"> 0дн. </TCell>
          <TCell title="ИТОГО - Сделки - Завершённые"> 0 </TCell>
          <TCell title="ИТОГО - Сделки - Не закрытые до 08.02.2026"> 0 </TCell>
          <TCell title="ИТОГО - Среднее время жизни незакрытых сделок"> 0дн. </TCell>
          <TCell title="ИТОГО - Сделки - Конверсия Всего"> 0.00% </TCell>
          <TCell title="ИТОГО - Сделки - Конверсия Брак"> 0.00% </TCell>
          <TCell title="ИТОГО - Сделки - Конверсия Успешно"> 0.00% </TCell>
          <TCell title="ИТОГО - Сделки - Доля успешных"> 0.00% </TCell>
          <TCell title="ИТОГО - Сделки в стадии Общая: - Переговоры в процессе"> 0 </TCell>
          <TCell title="ИТОГО - Сделки в стадии разработка сайтов: - Новая"> 0 </TCell>
          <TCell title="ИТОГО - Сделки в стадии разработка сайтов: - В работе"> 0 </TCell>
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
