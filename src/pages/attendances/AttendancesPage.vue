<template>
  <q-page
    class=""
    padding
  >
    <q-table
      :loading="attendances.loadingTable"
      v-model:pagination="attendances.pagination"
      @request="attendances.getList"
      square
      flat
      bordered
      :rows="attendances.list"
      :columns="attendances.columns"
      class="full-width"
    >
      <template v-slot:top>
        <div class="full-width row">
          <div class="col">sdf</div>
          <div class=" col-auto">
            <q-btn
              rounded
              color="accent"
              icon="add"
              title="Add User"
              @click="() => {
                attendances.reset()
                $router.push({
                  name: 'attendances-form',
                  params: {
                    id: 'add',
                  }
                })
              }"
            ></q-btn>
          </div>
        </div>

      </template>
      <template v-slot:body-cell-actions="props">
        <q-td
          auto-width
          :props="props"
        >
          <div
            class="row q-col-gutter-sm"
            style="min-width: 100px;"
          >
            <div class="col-auto">
              <q-btn
                v-close-popup
                round
                @click="() => {
                  attendances.form = {
                    ...props.row
                  }
                  attendances.showAddEditForm = true;
                }"
                color="accent"
                size="12px"
                icon="edit"
              ></q-btn>
            </div>
            <div class="col-auto">
              <q-btn
                round
                @click="() => {
                  useHelper.tempData = { ...props.row }
                  useHelper.tempData.title = props.row.name;
                  useHelper.tempData.endpoint = 'attendances'
                  useHelper.showConfirmDeleteDialog = true;
                  useHelper.pagination = { ...attendances.pagination }
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
      attendances.list = data.data
      attendances.pagination.rowsNumber = data.total
    }" />
  </q-page>
</template>
<script setup>
import { attendances } from 'src/scripts/attendances_page/helper';
import { onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';

const tableRef = ref(null)
onUnmounted(() => {
  attendances.list = []
}), onBeforeMount(() => {
  attendances.list = []

}),
  onMounted(async () => {

    await attendances.getList()
  })

function onRowClick(ev, data) {
  const selectedIndex = attendances.selectedList.findIndex(
    (item) => item.id == data.id
  )
  if (selectedIndex >= 0)
    attendances.selectedList.splice(selectedIndex, 1)
  else
    attendances.selectedList.push(data)
}
</script>
