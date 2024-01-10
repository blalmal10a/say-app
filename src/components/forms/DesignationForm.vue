<template>
  <q-dialog
    no-backdrop-dismiss
    v-model="designations.showAddEditForm"
  >
    <q-card style="min-width: min(400px, 100vw);">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title class="row">
          <div class="col">{{ designations.form?._id ? 'Edit' : 'Add' }} Designation</div>
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
        <q-form @submit="designations.add">
          <q-input
            autofocus
            v-model="designations.form.name"
            type="text"
            label="Name"
            :rules="[val => !!val || 'Name is required']"
          />

          <q-btn
            :loading="designations.loadingSubmitButton"
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
import { designations } from 'src/scripts/designations_page/helper';
</script>
