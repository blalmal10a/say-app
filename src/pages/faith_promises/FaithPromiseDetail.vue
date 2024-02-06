<template>
  <q-page
    class=""
    padding
  >
    <q-table
      ref="tableRef"
      square
      flat
      bordered
      :filter="faith_promises.pagination.filter"
      :loading="faith_promises.loadingTable"
      :rows="faith_promises.users"
      :columns="faith_promises.form_columns"
      :rows-per-page-options="[0]"
      hide-pagination
      class="full-width "
      key="id"
    >
      <template v-slot:top>
        <div class="full-width">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6 col-md-4">
              <q-input
                dense
                outlined
                v-model="faith_promises.pagination.filter"
                label="Search"
              />
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <q-btn
                outline
                color="white"
                class="full-width"
                @click="faith_promises.createDialog = true"
              >
                {{ date.formatDate(faith_promises.selectedDate, 'MMMM') }}
                <!-- <q-popup-proxy v-model="faith_promises.dateMenu">
                  <q-date
                    v-model="faith_promises.selectedDate"
                    default-view="Months"
                    mask="YYYY-MM-DD"
                    @navigation="(ev) => {
                      faith_promises.selectedDate = `${ev.year}-${ev.month < 10 ? `0${ev.month}` : ev.month}-01`
                      faith_promises.dateMenu = false;
                    }"
                  >
                  </q-date>
                </q-popup-proxy> -->
              </q-btn>

            </div>
            <!-- <div class="col-12 col-sm-6 col-md-4">
              <q-btn
                class="full-width"
                @click="faith_promises.save($route, $router, true)"
                label="save"
                color="primary"
              ></q-btn>
            </div> -->
          </div>
        </div>
      </template>
      <template v-slot:body-cell-amount="props">
        <q-td
          auto-width
          :props="props"
        >
          <q-input
            @blur="faith_promises.onBlurAmount(props.row, $route)"
            type="number"
            dense
            style="min-width: max(100px, 30vw)"
            v-model="props.row.amount"
            label="₹"
          ></q-input>
        </q-td>

      </template>
      <template v-slot:no-data>
        <q-td class="full-width">
          <div
            v-if="!faith_promises.loadingTable && faith_promises.users?.length == 0"
            class="q-my-md text-center"
            style="font-size: max(2vw, 17px);"
          >

            {{ date.formatDate(faith_promises.selectedDate, 'Do MMM, YYYY') }}
            <br>
            <div class="q-mt-md">
              ALL PAID
            </div>

          </div>

        </q-td>
      </template>
    </q-table>

    <q-markup-table
      flat
      square
      bordered
      class="q-mt-md"
      style="margin-bottom: 100px;"
    >

      <thead>
        <tr>
          <th
            colspan="100%"
            style="font-size: 17px; text-align: left;"
          >
            FAITH PROMISE PE TAWHTE
          </th>
        </tr>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(item, index) in faith_promises.paid_list"
          :key="index"
        >
          <q-tr>
            <td>
              {{ item.name }}
            </td>
            <td>
              <!-- {{ item.faith_promise_payments?.[0]?.amount }} -->
              <q-input
                @blur="faith_promises.onBlurAmount({ amount: item.faith_promise_payments?.[0]?.amount, _id: item._id, }, $route)"
                type="number"
                dense
                style="min-width: max(100px, 30vw)"
                v-model="item.faith_promise_payments[0].amount"
              ></q-input>

            </td>
          </q-tr>
        </template>
      </tbody>
    </q-markup-table>


    <confirm-delete @update-table="(data) => {
      faith_promises.list = data.data
      faith_promises.pagination.rowsNumber = data.total
    }" />



    <q-dialog
      persistent
      v-model="faith_promises.createDialog"
    >

      <q-card flat>
        <q-inner-loading
          :showing="faith_promises.loadingTable"
          style="z-index: 2;"
        >
          <q-spinner-gears
            size="50px"
            color="primary"
          />
        </q-inner-loading>
        <q-toolbar class="bg-primary">
          <q-toolbar-title>
            SELECT FAITH PROMISE MONTH
          </q-toolbar-title>
          <q-btn
            flat
            round
            icon="close"
            v-close-popup
          />
        </q-toolbar>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div
              class="col-4"
              v-for="(item, index) in monthNames"
              :key="index"
            >
              <q-item
                :disable="faith_promises.loadingTable"
                clickable
                style="border-radius: 4px;"
                @click="faith_promises.checkMonthExists(index, $router)"
              >
                <q-item-section class="text-center">
                  {{ item }}
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-sticky
      expand
      position="bottom"
      :class="{
        'q-px-xs': $q.screen.lt.sm,
        'q-px-md': $q.screen.gt.xs && $q.screen.lt.lg,
        'q-px-lg': !$q.screen.lt.lg,
      }"
      style="border-top: 1px solid #aaa;"
    >

      <div class="q-py-md q-px-xs bg-dark col-12 row justify-end">
        <div class="col-12 col-sm-6 col-md-4">
          <q-btn
            :loading="faith_promises.loadingSubmitButton"
            class="full-width"
            @click="faith_promises.save($route, $router)"
            :label="`save and back (${faith_promises.detail?.total_amount ? `₹${faith_promises.detail?.total_amount}` : 'N/A'})`"
            color="primary"
          ></q-btn>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>
<script setup>
import { faith_promises } from 'src/scripts/faith_promises_page/helper';
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';
import { date } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute()
const tableRef = ref(null)
onBeforeMount(() => {
  faith_promises.users = [];
  faith_promises.selectedList = [];
  const today = date.formatDate(new Date(), 'ddd')
  if (today == 'Mon') faith_promises.selectedTag = 'Monday'

}),
  onBeforeUnmount(() => {
    faith_promises.save(route)
  }),
  onMounted(async () => {
    faith_promises.show(route, route)
  })

function onRowClick(ev, data) {
  const selectedIndex = faith_promises.selectedList.findIndex(
    (item) => item._id == data._id
  )
  if (selectedIndex >= 0)
    faith_promises.selectedList.splice(selectedIndex, 1)
  else
    faith_promises.selectedList.push(data)
}


const monthNames = [
  "Jan", // January
  "Feb", // February
  "Mar", // March
  "Apr", // April
  "May", // May
  "Jun", // June
  "Jul", // July
  "Aug", // August
  "Sep", // September
  "Oct", // October
  "Nov", // November
  "Dec", // December
];
</script>
