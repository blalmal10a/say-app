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
          <!-- <q-select
            v-model="users.form.designation_id"
            outlined
            :options="[
              'Leader',
              'Asst. Leader',
              'Secretary',
              'Asst. Secretary',
              'Member',
            ]"
            label="Designation"
            hint=""
          ></q-select> -->
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
</script>
