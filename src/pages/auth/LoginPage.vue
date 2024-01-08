<template>
  <q-page
    class="row justify-center"
    style="padding-top: 10vh;"
  >

    <div
      style="min-width: min(500px, 100vw);"
      class="q-pa-md"
    >
      <q-card class="q-pa-lg">
        <q-form @submit="login">
          <q-card-section>
            <h3 class="q-ma-none text-center">LOGIN</h3>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  autofocus
                  outlined
                  v-model="user.phone"
                  type="text"
                  label="Phone"
                />
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  v-model="user.password"
                  type="password"
                  label="Password"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <div class="full-width q-px-sm">
              <q-btn
                :loading="loading"
                type="submit"
                style="height: 50px"
                class="full-width"
                color="primary"
                label="login"
              ></q-btn>
            </div>
          </q-card-actions>
        </q-form>
      </q-card>

    </div>


  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'src/scripts/global/auth';
const q = useQuasar();
const router = useRouter()

const loading = ref(false)
const user = ref({ phone: '', password: '' });

async function login() {
  try {
    loading.value = true;
    const res = await api.post('/auth/login',
      user.value
      // {
      // phone: 1,
      // password: 'Kurkur3;'
      // }
    )
    auth.user = res.data.user;
    localStorage.setItem('token', res.data?.token)
    api.defaults.headers.Authorization = `Bearer ${res.data.token}`
    router.push({ name: 'home' })
    loading.value = false;
  } catch (error) {
    loading.value = false;
    q.notify(error.response?.data?.message ?? error?.message)
    console.log('error: ', error.message)
  }
}
</script>
