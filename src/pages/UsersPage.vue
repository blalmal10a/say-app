<template>
  <q-page
    class=""
    padding
  >
    <q-table
      :loading="users.loadingTable"
      v-model:pagination="users.pagination"
      @request="users.getList"
      square
      flat
      bordered
      :rows="users.list"
      :columns="users.columns"
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
                users.reset()
                users.showAddEditForm = true
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
                  users.form = {
                    ...props.row
                  }
                  users.showAddEditForm = true;
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
                  useHelper.tempData.endpoint = 'users'
                  useHelper.showConfirmDeleteDialog = true;
                  useHelper.pagination = { ...users.pagination }
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

    <user-form />
    <confirm-delete @update-table="(data) => {
      users.list = data.data
      users.pagination.rowsNumber = data.total
    }" />
  </q-page>
</template>
<script setup>
import { users } from 'src/scripts/users_page/helper';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import ConfirmDelete from 'src/components/global/ConfirmDelete.vue';
import { useHelper } from 'src/scripts/global/helper';
import UserForm from 'src/components/forms/UserForm.vue';

onUnmounted(() => {
  users.list = []
}),
  onBeforeMount(() => {
    users.list = []

  }),
  onMounted(async () => {
    await users.getList()
  })
</script>
