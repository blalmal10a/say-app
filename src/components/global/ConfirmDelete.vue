<template>
  <q-dialog
    no-backdrop-dismiss
    v-model="useHelper.showConfirmDeleteDialog"
  >
    <q-card>
      <q-toolbar>
        <q-toolbar-title>
          Confirm Delete
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        Are you sure you want to delete everything related to {{ useHelper.tempData?.title }}?
      </q-card-section>
      <q-card-actions class="">
        <q-form
          class="full-width"
          @submit="onSubmitConfirmDelete"
        >
          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-btn
                v-close-popup
                outline
                class="full-width"
                label="cancel"
              ></q-btn>

            </div>
            <div class="col">
              <q-btn
                :loading="useHelper.loadingConfirmDelete"
                type="submit"
                color="negative"
                class="full-width"
                label="confirm"
              ></q-btn>
            </div>
          </div>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted } from 'vue';
import { useHelper } from '../../scripts/global/helper';


const emit = defineEmits(['update-table'])

async function onSubmitConfirmDelete() {
  try {
    useHelper.loadingConfirmDelete = true;
    const data = await useHelper.onConfirmDelete()
    emit('update-table', data)
    loadingConfirmDelete = false;
  } catch (error) {
    console.log('error: ', error.message)

  }
}
</script>
