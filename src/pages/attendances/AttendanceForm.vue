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
      :filter="attendances.pagination.filter"
      selection="multiple"
      @row-click="onRowClick"
      :loading="attendances.loadingTable"
      :rows="attendances.users"
      :columns="attendances.form_columns"
      :rows-per-page-options="[0]"
      hide-pagination
      class="full-width"
      v-model:selected="attendances.selectedList"
      row-key="_id"
    >
      <template v-slot:top>
        <div class="full-width">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6 col-md-4">
              <q-input
                @focus="attendances.showActions = false"
                @blur="attendances.showActions = true"
                dense
                outlined
                v-model="attendances.pagination.filter"
                label="Search"
              />
            </div>
            <div
              class="col-12 col-sm-6 col-md-4"
              v-if="attendances.showActions"
            >
              <q-select
                dense
                outlined
                :options="tagOptions"
                v-model="attendances.selectedTag"
              ></q-select>
            </div>
            <div
              class="col-12 col-sm-6 col-md-4"
              v-if="attendances.showActions"
            >
              <q-btn
                no-caps
                class="full-width"
                :label="date.formatDate(attendances.selectedDate, 'Do MMM, YYYY')"
                color="primary"
              >
                <q-menu
                  ref="date_menu_ref"
                  fit
                >
                  <div class="row justify-center">
                    <q-date
                      mask="YYYY-MM-DD"
                      flat
                      v-model="attendances.selectedDate"
                      minimal
                      @update:model-value="$refs.date_menu_ref.hide()"
                    />
                  </div>
                </q-menu>
              </q-btn>
            </div>
            <div
              class="col-12 col-sm-6 col-md-4"
              v-if="attendances.showActions"
            >
              <q-btn
                class="full-width"
                @click="attendances.save($route, $router)"
                label="save"
                color="primary"
              ></q-btn>
            </div>
          </div>
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
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';
import { date } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute()

const tableRef = ref(null)
const tagOptions = computed(() => {
  if (attendances.is_executive) {
    attendances.selectedTag = 'Council';
    return [
      'Council',
      'Activity'
    ]
  }
  attendances.selectedTag = 'Meeting';
  return [
    'Meeting',
    'Activity',
  ]
})
onBeforeMount(() => {
  attendances.users = [];
  attendances.selectedList = [];
  const today = date.formatDate(new Date(), 'ddd')
  if (today == 'Mon') attendances.selectedTag = 'Monday'

}),
  onMounted(async () => {
    if (route.params._id == 'add') {
      await attendances.create(route)
      attendances.selectedDate = date.formatDate(new Date(), 'YYYY-MM-DD')
    }
    else
      await attendances.update(route.params._id, route)

    // await attendances.getList()
  })

function onRowClick(ev, data) {
  const selectedIndex = attendances.selectedList.findIndex(
    (item) => item._id == data._id
  )
  if (selectedIndex >= 0)
    attendances.selectedList.splice(selectedIndex, 1)
  else
    attendances.selectedList.push(data)
}
</script>
