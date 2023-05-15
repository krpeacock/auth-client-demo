<template>
<main>
  <div v-if="isReady">
  <LoggedIn v-if="isAuthenticated" />
  <LoggedOut v-else />
  </div>
</main>
</template>

<script>
import LoggedOut from './components/LoggedOut.vue'
import LoggedIn from './components/LoggedIn.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from "./store/auth";

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);
    const isReady = isAuthenticated !== null;
    return {
      isReady,
      isAuthenticated
    }

  },
  mounted() {
    const authStore = useAuthStore();
    authStore.init();
  },
  components: {
    LoggedOut,
    LoggedIn
  }
}
</script>

<style>

</style>
