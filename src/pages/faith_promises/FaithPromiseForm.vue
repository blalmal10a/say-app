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
      class="full-width"
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
              >
                {{ date.formatDate(faith_promises.selecteDate, 'MMMM') }}
                <q-popup-proxy v-model="faith_promises.dateMenu">
                  <q-date
                    v-model="faith_promises.selecteDate"
                    default-view="Months"
                    mask="YYYY-MM-DD"
                    @navigation="(ev) => {
                      faith_promises.selecteDate = `${ev.year}-${ev.month < 10 ? `0${ev.month}` : ev.month}-01`
                      faith_promises.dateMenu = false;
                    }"
                  >
                  </q-date>
                </q-popup-proxy>
              </q-btn>

            </div>
            <div class="col-12 col-sm-6 col-md-4">
              <q-btn
                class="full-width"
                @click="faith_promises.save($route, $router)"
                label="save"
                color="primary"
              ></q-btn>
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
          ></q-input>
        </q-td>

      </template>
    </q-table>


    <confirm-delete @update-table="(data) => {
      faith_promises.list = data.data
      faith_promises.pagination.rowsNumber = data.total
    }" />
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
      faith_promises.selecteDate = date.formatDate(new Date().setDate(1), 'YYYY-MM-DD');
      await faith_promises.create(route)
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
</script>
