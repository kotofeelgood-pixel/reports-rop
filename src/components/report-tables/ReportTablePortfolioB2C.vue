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
          <TCol title="Портфель" :colspan="2" />
          <TCol title="Активность по портфелю" :colspan="5" />
          <TCol title="Продажи по портфелю" :colspan="4" />
          <TCol title="Зона риска" :colspan="3" />
        </TRow>
        <TRow>
          <TCol title="Менеджер" font-size="12px" />
          <TCol title="Всего" font-size="12px" />
          <TCol title="Новые" font-size="12px" />

          <TCol title="Со звонками" font-size="12px" />
          <TCol title="С письмами" font-size="12px" />
          <TCol title="С чатами" font-size="12px" />
          <TCol title="С активностью" font-size="12px" />
          <TCol title="Процент активной клиентской базы" font-size="12px" />

          <TCol title="Со сделками" font-size="12px" />
          <TCol title="Проработка клиентской базы" font-size="12px" />
          <TCol title="С продажей" font-size="12px" />
          <TCol title="Продаваемость в клиентскую базу" font-size="12px" />

          <TCol title="С проигранными" font-size="12px" />
          <TCol title="Без сделок" font-size="12px" />
          <TCol title="Без активности" font-size="12px" />
        </TRow>
      </thead>

      <tbody>
        <TRow user-id="812" class-name="row812">
          <TCell class="bg-white sticky-first-col">
            <a href="//itsolutions.bitrix24.ru/company/personal/user/812/" target="_blank">
              Котенко Виктор
            </a>
          </TCell>

          <TCell
            class="C dt-type-numeric"
            title="Котенко Виктор - Портфель - Всего контактов на менеджере"
            data-key="C_V"
          >
            0
          </TCell>
          <TCell
            class="C dt-type-numeric"
            title="Котенко Виктор - Портфель - Новых контактов на менеджере (созданных в выбранный период)"
            data-key="C_N"
          >
            0
          </TCell>

          <TCell class="CO dt-type-numeric">
            <span title="Котенко Виктор - Контакты - Со звонками" data-key="C_WithCalls">0</span>
            <br />
            <span class="mini" data-key="C_Calls" title="Котенко Виктор - Звонки">0</span>
          </TCell>
          <TCell class="CO dt-type-numeric">
            <span title="Котенко Виктор - Контакты - С письмами" data-key="C_WithMail">0</span>
            <br />
            <span class="mini" data-key="C_Mail" title="Котенко Виктор - Письма">0</span>
          </TCell>
          <TCell class="CO dt-type-numeric">
            <span title="Котенко Виктор - Контакты - С чатами" data-key="C_WithChat">0</span>
            <br />
            <span class="mini" data-key="C_Chat" title="Котенко Виктор - Чаты">0</span>
          </TCell>
          <TCell class="CO dt-type-numeric">
            <span title="Котенко Виктор - Контакты - С активностью" data-key="C_WithAct">0</span>
            <br />
            <span class="mini" data-key="C_Act" title="Котенко Виктор - Активности">0</span>
          </TCell>
          <TCell
            class="CO greyCell dt-type-numeric"
            title="Котенко Виктор - % активной клиентской базы (0 / 0)"
          >
            0.00%
          </TCell>

          <TCell class="C dt-type-numeric">
            <span
              title="Котенко Виктор - Контакты со сделками в работе за период"
              data-key="C_vR"
            >
              0
            </span>
            <br />
            <span
              class="mini"
              data-key="C_vR_deals"
              title="Котенко Виктор - сделки в работе за период"
            >
              0
            </span>
          </TCell>
          <TCell
            class="C greyCell dt-type-numeric"
            title="Котенко Виктор - Проработка клиентской базы (0 / 0)"
            data-key="C_vR_conv"
          >
            0.00%
          </TCell>
          <TCell class="C dt-type-numeric">
            <span
              title="Котенко Виктор - Контакты с успешными сделками за период"
              data-key="C_U"
            >
              0
            </span>
            <br />
            <span
              class="mini"
              data-key="C_U_deals"
              title="Котенко Виктор - Успешные сделки за период"
            >
              0
            </span>
          </TCell>
          <TCell
            class="C greyCell dt-type-numeric"
            title="Котенко Виктор - Продаваемость в клиентскую базу (0 / 0)"
            data-key="C_U_conv"
          >
            0.00%
          </TCell>

          <TCell class="CO dt-type-numeric">
            <span
              title="Котенко Виктор - Контакты с проигранными сделками за период"
              data-key="C_nU"
            >
              0
            </span>
            <br />
            <span
              class="mini"
              data-key="C_nU_deals"
              title="Котенко Виктор - Проигранные сделки за период"
            >
              0
            </span>
          </TCell>
          <TCell
            class="CO dt-type-numeric"
            title="Котенко Виктор - Контакты без сделок за период"
            data-key="C_nD"
          >
            0
          </TCell>
          <TCell
            class="CO dt-type-numeric"
            title="Котенко Виктор - Контакты без активностей за период"
            data-key="C_nA"
          >
            0
          </TCell>
        </TRow>
      </tbody>

      <tfoot>
        <TRow class-name="row0" user-id="0">
          <TCell class="bg-white sticky-first-col">
            ИТОГО
          </TCell>

          <TCell
            class="C dt-type-numeric"
            title="ИТОГО - Портфель - Всего контактов на менеджере"
            data-key="C_V"
          >
            0
          </TCell>
          <TCell
            class="C dt-type-numeric"
            title="ИТОГО - Портфель - Новых контактов на менеджере (созданных в выбранный период)"
            data-key="C_N"
          >
            0
          </TCell>

          <TCell class="CO dt-type-numeric">
            <span title="ИТОГО - Контакты - Со звонками" data-key="C_WithCalls">0</span>
            <br />
            <span class="mini" data-key="C_Calls" title="ИТОГО - Звонки">0</span>
          </TCell>
          <TCell class="CO dt-type-numeric">
            <span title="ИТОГО - Контакты - С письмами" data-key="C_WithMail">0</span>
            <br />
            <span class="mini" data-key="C_Mail" title="ИТОГО - Письма">0</span>
          </TCell>
          <TCell class="CO dt-type-numeric">
            <span title="ИТОГО - Контакты - С чатами" data-key="C_WithChat">0</span>
            <br />
            <span class="mini" data-key="C_Chat" title="ИТОГО - Чаты">0</span>
          </TCell>
          <TCell class="CO dt-type-numeric">
            <span title="ИТОГО - Контакты - С активностью" data-key="C_WithAct">0</span>
            <br />
            <span class="mini" data-key="C_Act" title="ИТОГО - Активности">0</span>
          </TCell>
          <TCell
            class="CO greyCell dt-type-numeric"
            title="ИТОГО - % активной клиентской базы (0 / 0)"
          >
            0.00%
          </TCell>

          <TCell class="C dt-type-numeric">
            <span title="ИТОГО - Контакты со сделками в работе за период" data-key="C_vR">0</span>
            <br />
            <span class="mini" data-key="C_vR_deals" title="ИТОГО - сделки в работе за период">
              0
            </span>
          </TCell>
          <TCell
            class="C greyCell dt-type-numeric"
            title="ИТОГО - Проработка клиентской базы (0 / 0)"
            data-key="C_vR_conv"
          >
            0.00%
          </TCell>
          <TCell class="C dt-type-numeric">
            <span
              title="ИТОГО - Контакты с успешными сделками за период"
              data-key="C_U"
            >
              0
            </span>
            <br />
            <span class="mini" data-key="C_U_deals" title="ИТОГО - Успешные сделки за период">
              0
            </span>
          </TCell>
          <TCell
            class="C greyCell dt-type-numeric"
            title="ИТОГО - Продаваемость в клиентскую базу (0 / 0)"
            data-key="C_U_conv"
          >
            0.00%
          </TCell>

          <TCell class="CO dt-type-numeric">
            <span
              title="ИТОГО - Контакты с проигранными сделками за период"
              data-key="C_nU"
            >
              0
            </span>
            <br />
            <span
              class="mini"
              data-key="C_nU_deals"
              title="ИТОГО - Проигранные сделки за период"
            >
              0
            </span>
          </TCell>
          <TCell
            class="CO dt-type-numeric"
            title="ИТОГО - Контакты без сделок за период"
            data-key="C_nD"
          >
            0
          </TCell>
          <TCell
            class="CO dt-type-numeric"
            title="ИТОГО - Контакты без активностей за период"
            data-key="C_nA"
          >
            0
          </TCell>
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

