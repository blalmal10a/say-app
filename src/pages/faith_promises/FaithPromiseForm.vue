<template>
  <q-page
    class=""
    padding
    style="position: relative;"
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
      class="full-width q-mb-xl"
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
              >

              </q-input>
            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <div class="row q-col-gutter-sm">
                <div class="col">
                  <q-btn
                    outline
                    color="white"
                    class="full-width"
                    style="height: 40px"
                  >
                    {{ date.formatDate(faith_promises.selectedDate, 'MMMM') }}
                    <q-popup-proxy v-model="faith_promises.dateMenu">
                      <q-date
                        v-model="faith_promises.selectedDate"
                        default-view="Months"
                        mask="YYYY-MM-DD"
                        @navigation="(ev) => {
                          console.log('navigate')
                          faith_promises.selectedDate = `${ev.year}-${ev.month < 10 ? `0${ev.month}` : ev.month}-01`
                          faith_promises.dateMenu = false;
                        }"
                      >
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
              </div>
            </div>

          </div>
        </div>
      </template>
      <template v-slot:body-cell-amount="props">
        <q-td
          auto-width
          :props="props"
        >
          <q-input
            type="number"
            dense
            style="min-width: max(100px, 30vw)"
            v-model="props.row.amount"
            label="₹"
            @blur="faith_promises.onBlurAmount(props.row)"
          ></q-input>
        </q-td>
      </template>



    </q-table>

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
            class="full-width"
            @click="faith_promises.save($route, $router)"
            label="save"
            color="primary"
          ></q-btn>
        </div>
      </div>
    </q-page-sticky>

    <confirm-delete @update-table="(data) => {
      faith_promises.list = data.data
      faith_promises.pagination.rowsNumber = data.total
    }" />

    <q-dialog
      persistent
      v-model="faith_promises.createDialog"
    >

      <q-card flat>
        <q-toolbar class="bg-primary">
          <q-toolbar-title>
            <q-btn
              flat
              round
              icon="home"
              @click="() => {
                $router.push({
                  name: 'faith-promises'
                })
                faith_promises.createDialog = false;
              }"
            />
            SELECT FAITH PROMISE MONTH
          </q-toolbar-title>
        </q-toolbar>
        <q-card-section>

          <div class="row q-col-gutter-sm">
            <div
              class="col-4"
              v-for="(item, index) in monthNames"
              :key="index"
            >
              <q-item
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
  onMounted(async () => {
    if (route.params._id == 'add') {
      faith_promises.createDialog = true;
      faith_promises.selectedDate = date.formatDate(new Date().setDate(1), 'YYYY-MM-DD');
      // await faith_promises.create(route)
    }
    else
      await faith_promises.update(route.params._id, route)

    // await faith_promises.getList()
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
