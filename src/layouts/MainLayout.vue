<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header style="background: radial-gradient(100% 50% at bottom, transparent 50%, #012962 51%);height: 100px "> -->
    <q-header class="custom-header">
      <q-toolbar>
        <q-toolbar-title>
          Salvation Army Youth
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          v-if="$route.meta?.requires_auth || auth.user?.id"
        />
        <q-btn
          flat
          :to="{
            name: 'login'
          }"
          v-if="$route.name == 'home' && !auth.user?.id"
          label="Login"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.meta?.requires_auth || auth.user?.id"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
      <q-list>
        <q-item-label header>
          <!-- Essential Links -->
        </q-item-label>
        <q-item
          v-for="(item, index) in routeList"
          :key="index"
          :active="$route.name == item.name"
          :to="{
            name: item.name
          }"
          @click="leftDrawerOpen = false"
        >
          <q-item-section>
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="overflow: hidden;">


      <RouterView />

    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { auth } from 'src/scripts/global/auth';
import { useHelper } from 'src/scripts/global/helper';
import { onBeforeMount, onMounted, ref } from 'vue';

const q = useQuasar()
const leftDrawerOpen = ref(false);
onMounted(() => {
  const wrapper = document.getElementById('wrapper')
  useHelper.wrapper = wrapper;
  console.log('wrapper in main layout', wrapper.style.display = 'none')
}),
  onBeforeMount(() => {
    q.dark.set('auto')
  })

const routeList = [
  {
    label: 'Dashboard',
    name: 'home'
  },
  {
    label: 'Attendance',
    name: 'attendances'
  },
  {
    label: 'Faith Promise',
    name: 'faith-promises'
  },

  {
    label: 'Members',
    name: 'users'
  },

  {
    label: 'Designations',
    name: 'designation'
  },
]
</script>
