<template>
  <main>
    <div v-if="isReady">
      <LoggedIn v-if="isAuthenticated" />
      <LoggedOut v-else />
    </div>
  </main>
</template>

<script setup>
import LoggedOut from "./components/LoggedOut.vue";
import LoggedIn from "./components/LoggedIn.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./store/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
const { isReady, isAuthenticated } = storeToRefs(authStore);

onMounted(() => {
  authStore.init();
});
</script>
