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
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>
        <!--  -->
      </q-list>
    </q-drawer>

    <q-page-container style="overflow: hidden;">


      <RouterView />

    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useQuasar } from 'quasar';
import { onBeforeMount, ref } from 'vue';

const q = useQuasar()
const leftDrawerOpen = ref(false);

onBeforeMount(() => {
  q.dark.set('auto')
})


</script>
