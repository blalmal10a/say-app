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
        <div class="full-width">
          <div class=" row q-col-gutter-sm">
            <div class="col-12 col-sm-6 col-md-4">
              <q-select
                outlined
                dense
                style="min-height: 50px;"
                v-model="attendances.pagination.is_executive"
                map-options
                emit-value
                :options="[{
                  value: false,
                  label: 'Member'
                }, {
                  value: true,
                  label: 'Executive'
                },]"
                @update:model-value="attendances.getList({ pagination: attendances.pagination })"
              ></q-select>
            </div>
            <div class=" col-6 col-sm-3 col-md-2">
              <q-btn
                no-caps
                class="full-width"
                label="Member"
                color="accent"
                icon="add"
                title="Add Attendance"
                @click="() => {
                  attendances.reset()
                  $router.push({
                    name: 'attendance-form',
                    params: {
                      _id: 'add',
                    }
                  })
                }"
              ></q-btn>
            </div>
            <div class=" col-6 col-sm-3 col-md-2">
              <q-btn
                no-caps
                class="full-width"
                color="accent"
                icon="new_label"
                title="Executive Attendance"
                label="Executive"
                @click="() => {
                  attendances.reset()
                  $router.push({
                    name: 'attendance-form',
                    params: {
                      _id: 'add',
                    },
                    query: {
                      executive: 1
                    }
                  })
                }"
              ></q-btn>
            </div>
          </div>
        </div>

      </template>
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="$router.push({
            name: 'attendance-detail',
            params: {
              _id: props.row._id
            }
          })"
        >
          <!-- :class="{
            'bg-teal-2 text-black': props.row.tag == 'Activity'

          }" -->
          <q-td style="position: relative;">
            <div class="q-pl-xs">
              {{ date.formatDate(props.row.date, "Do MMM, 'YY") }}
              <q-icon
                class="absolute-top-left q-pl-xs q-pt-xs"
                v-if="props.row.tag == 'Activity'"
                name="star"
                size="11px"
                color="primary"
              />
              <!-- <div
                :class="{
                  'text-green': props.row.tag == 'Activity'
                }"
                style="font-size: 9px"
              >
                {{ props.row.tag }}
              </div> -->
            </div>
          </q-td>
          <q-td auto-width>
            {{ props.row.no_of_attendant }}
          </q-td>
          <q-td auto-width>
            <div class="row q-col-gutter-sm no-wrap">
              <div class="col-auto">
                <q-btn
                  v-close-popup
                  round
                  @click="() => {
                    $router.push({
                      name: 'attendance-form',
                      params: {
                        _id: props.row._id
                      }
                    })

                    attendances.showAddEditForm = true;
                  }"
                  color="accent"
                  :size="$q.screen.lt.sm ? 'xs' : 'md'"
                  icon="edit"
                ></q-btn>
              </div>
              <div class="col-auto">
                <q-btn
                  round
                  @click="() => {
                    useHelper.tempData = { ...props.row }
                    useHelper.tempData.title = `attendence on ${props.row.date}`;
                    useHelper.tempData.endpoint = 'attendances'
                    useHelper.showConfirmDeleteDialog = true;
                    useHelper.pagination = { ...attendances.pagination }
                  }"
                  color="negative"
                  :size="$q.screen.lt.sm ? 'xs' : 'md'"
                  icon="delete"
                ></q-btn>
              </div>
            </div>
          </q-td>


        </q-tr>


      </template>
      <!-- <template v-slot:body-cell-actions="props">
        <q-td
          auto-width
          :props="props"
        >
          <div class="row q-col-gutter-sm no-wrap">
            <div class="col-auto">
              <q-btn
                v-close-popup
                round
                @click="() => {
                  $router.push({
                    name: 'attendance-form',
                    params: {
                      id: props.row._id
                    }
                  })

                  attendances.showAddEditForm = true;
                }"
                color="accent"
                :size="$q.screen.lt.sm ? 'xs' : 'md'"
                icon="edit"
              ></q-btn>
            </div>
            <div class="col-auto">
              <q-btn
                round
                @click="() => {
                  useHelper.tempData = { ...props.row }
                  useHelper.tempData.title = `attendence on ${props.row.date}`;
                  useHelper.tempData.endpoint = 'attendances'
                  useHelper.showConfirmDeleteDialog = true;
                  useHelper.pagination = { ...attendances.pagination }
                }"
                color="negative"
                :size="$q.screen.lt.sm ? 'xs' : 'md'"
                icon="delete"
              ></q-btn>
            </div>
          </div>
        </q-td>
      </template> -->
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
import { date } from 'quasar';

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
    (item) => item._id == data._id
  )
  if (selectedIndex >= 0)
    attendances.selectedList.splice(selectedIndex, 1)
  else
    attendances.selectedList.push(data)
}
</script>
