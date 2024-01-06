<template>
  <q-page class="flex flex-center">
    <q-btn
      color="white"
      text-color="black"
      label="Standard"
      @click="login"
    />

    <!--  -->
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

onMounted(() => {

});

async function login() {
  try {
    const res = await api.post('/login')
    console.log(res.data)
  } catch (error) {
    console.error(error.message);
  }
}
</script>

