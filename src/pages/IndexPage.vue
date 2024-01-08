<template>
  <q-page padding>
    <q-inner-loading
      :showing="loadingSummary"
      style="margin-bottom: 20vh;"
    >
      <q-spinner-rings
        size="min(70vh, 70vw)"
        color="primary"
      />
    </q-inner-loading>

    <div
      class="row"
      :class="{
        'q-col-gutter-md': $q.screen.lt.md,
        'q-col-gutter-lg': $q.screen.gt.sm,
      }"
    >
      <div
        v-for="(item, label) in summaryData"
        :key="label"
        class="col-12 col-sm-6"
      >
        <q-card class="text-center full-height">
          <q-card-section>
            <h4>
              {{ label }}
            </h4>
            <h3>
              {{ item }}
            </h3>

          </q-card-section>
        </q-card>
      </div>

    </div>



    <!-- <q-btn
      @click="login"
      label="login"
    ></q-btn> -->
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const q = useQuasar()
const router = useRouter()
const route = useRoute()

const loadingSummary = ref(false)
const summaryData = ref({})

onMounted(() => {
  // getUser()
  getSummary()
});
async function getUser() {
  try {
    const token = localStorage.getItem('token')
    const res = await api.get('auth/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  } catch (error) {

  }
}

async function getSummary() {

  try {
    loadingSummary.value = true;
    const res = await api.get('summary')
    console.log(res.data)
    summaryData.value = res.data;
    loadingSummary.value = false;
  } catch (error) {
    loadingSummary.value = false;
    console.error(error.message);
  }
}

</script>

