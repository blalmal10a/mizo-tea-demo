<template>
  <q-page class="flex flex-center">
    <h1>YOUR APP</h1>
  </q-page>
</template>

<script setup>
import { user } from 'src/scripts/auth/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
onMounted(async () => {
  try {
    const asdf = await user.check_auth(router)
  } catch (error) {
    console.error(error.message);
  }
})
</script>
