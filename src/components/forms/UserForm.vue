<template>
  <q-dialog
    no-backdrop-dismiss
    v-model="users.showAddEditForm"
  >
    <q-card style="min-width: min(400px, 100vw);">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="row">
          <div class="col">{{ users.form?.id ? 'Edit' : 'Add' }} User</div>
          <div class="col-auto">
            <q-btn
              v-close-popup
              round
              flat
              icon="close"
            ></q-btn>
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <q-form @submit="users.add">
          <q-input
            autofocus
            v-model="users.form.name"
            type="text"
            label="Name"
            :rules="[val => !!val || 'Name is required']"
          />
          <q-input
            v-model="users.form.phone"
            type="text"
            label="Phone"
            :rules="[val => !!val || 'Phone is required']"
          />

          <q-select
            outlined
            emit-value
            map-options
            multiple
            v-model="users.form.designations"
            :options="designations.list"
            label="Designation"
            hint=""
            option-label="name"
            option-value="id"
          ></q-select>


          <!-- <q-input
          v-model="users.form.house_no"
          type="text"
          label="House No."
          hint=""
        /> -->
          <q-btn
            :loading="users.loadingSubmitButton"
            type="submit"
            color="primary"
            class="full-width q-mt-md"
            label="Submit"
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { users } from 'src/scripts/users_page/helper';
import { designations } from 'src/scripts/designations_page/helper';
import { onMounted } from 'vue';
onMounted(() => {
  designations.getList();
})
</script>
