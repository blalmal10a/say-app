<template>
  <q-page
    class=""
    padding
  >
    <q-table
      :loading="faith_promises.loadingTable"
      v-model:pagination="faith_promises.pagination"
      @request="faith_promises.getList"
      square
      flat
      bordered
      :rows="faith_promises.list"
      :columns="faith_promises.columns"
      class="full-width"
    >
      <template v-slot:top>
        <div class="full-width">
          <div class=" row q-col-gutter-sm">
            <div class="col"></div>
            <div class=" col-auto">
              <q-btn
                rounded
                color="accent"
                icon="add"
                title="Add Faith Promise"
                @click="() => {
                  faith_promises.reset()
                  $router.push({
                    name: 'faith-promise-form',
                    params: {
                      id: 'add',
                    }
                  })
                }"
              ></q-btn>
            </div>
          </div>
        </div>

      </template>
      <template v-slot:body-cell-actions="props">
        <q-td
          auto-width
          :props="props"
        >
          <div class="row q-col-gutter-sm">
            <!-- style="min-width: 100px;" -->
            <div class="col-auto">
              <q-btn
                v-close-popup
                round
                @click="() => {
                  $router.push({
                    name: 'faith-promise-form',
                    params: {
                      id: props.row._id
                    }
                  })

                  // faith_promises.showAddEditForm = true;
                }"
                color="accent"
                size="12px"
                icon="edit"
              ></q-btn>
            </div>
            <div
              class="col-auto"
              v-if="false"
            >
              <q-btn
                round
                @click="() => {
                  useHelper.tempData = { ...props.row }
                  useHelper.tempData.title = `attendence on ${props.row.date}`;
                  useHelper.tempData.endpoint = 'faith-promises'
                  useHelper.showConfirmDeleteDialog = true;
                  useHelper.pagination = { ...faith_promises.pagination }
                }"
                color="negative"
                size="12px"
                icon="delete"
              ></q-btn>
            </div>
          </div>
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
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';

const tableRef = ref(null)
onUnmounted(() => {
  faith_promises.list = []
}), onBeforeMount(() => {
  faith_promises.list = []

}),
  onMounted(async () => {

    await faith_promises.getList()
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
