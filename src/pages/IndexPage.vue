<template>
  <q-page padding>
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




async function login() {
  try {

    const res = await api.post('/auth/login', {
      phone: 1,
      password: 'Kurkur3;'
    })
    localStorage.setItem('token', res.data?.token)
    console.log(res.data)
  } catch (error) {
    console.error(error.message);
  }
}
onMounted(() => {
  getUser()
});
async function getUser() {
  try {
    const token = localStorage.getItem('token')
    const res = await api.get('auth/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('res: ', res.data)
  } catch (error) {

  }
}


</script>

