<template>
  <q-page
    class=""
    padding
  >
    <q-table
      square
      flat
      bordered
      :rows="users.list"
      :columns="users.columns"
      class="full-width"
    >

    </q-table>
  </q-page>
</template>
<script setup>
import { users } from 'src/scripts/users_page/helper';
import { onMounted } from 'vue';
onMounted(async () => {
  await users.getList()
})
</script>
