<template>
  <q-page
    class=""
    padding
  >
    <q-table
      :loading="designations.loadingTable"
      v-model:pagination="designations.pagination"
      @request="designations.getList"
      square
      flat
      bordered
      :rows="designations.list"
      :columns="designations.columns"
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
              title="Add Designation"
              @click="() => {
                designations.reset()
                designations.showAddEditForm = true
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
                  designations.form = {
                    ...props.row
                  }
                  designations.showAddEditForm = true;
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
                  useHelper.tempData.endpoint = 'designations'
                  useHelper.showConfirmDeleteDialog = true;
                  useHelper.pagination = { ...designations.pagination }
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

    <designation-form />
    <confirm-delete @update-table="(data) => {
      designations.list = data.data
      designations.pagination.rowsNumber = data.total
    }" />
  </q-page>
</template>
<script setup>
import { designations } from 'src/scripts/designations_page/helper';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';
import DesignationForm from 'src/components/forms/DesignationForm.vue';

onUnmounted(() => {
  designations.list = []
}),
  onBeforeMount(() => {
    designations.list = []

  }),
  onMounted(async () => {
    await designations.getList()
  })
</script>
