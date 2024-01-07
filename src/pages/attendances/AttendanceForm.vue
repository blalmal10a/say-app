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
      selection="multiple"
      @row-click="onRowClick"
      :loading="attendances.loadingTable"
      :rows="attendances.users"
      :columns="attendances.form_columns"
      :rows-per-page-options="[0]"
      hide-pagination
      class="full-width"
      v-model:selected="attendances.selectedList"
      key="id"
    >
      <template v-slot:top>
        <div class="col">
          <q-select
            outlined
            style="max-width: 189px;"
            :options="['Monday', 'Fellowship', 'Others']"
            v-model="attendances.selectedTag"
          ></q-select>
        </div>
        <div class="col-auto">
          <q-btn
            @click="attendances.save($route, $router)"
            label="save"
            color="primary"
          ></q-btn>
        </div>
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
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';
import { date } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute()
const tableRef = ref(null)
onBeforeMount(() => {
  attendances.users = [];
  attendances.selectedList = [];
  const today = date.formatDate(new Date(), 'ddd')
  if (today == 'Mon') attendances.selectedTag = 'Monday'

}),
  onMounted(async () => {
    if (route.params.id == 'add')
      await attendances.create(route)
    else
      await attendances.update(route.params.id, route)

    // await attendances.getList()
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
