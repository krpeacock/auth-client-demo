<template>
<main>

  <LoggedIn v-if="isAuthenticated" />
  <LoggedOut v-else />
</main>
</template>

<script>
import LoggedOut from './components/LoggedOut.vue'
import LoggedIn from './components/LoggedIn.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from "./store/index";

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);

    return {
      isAuthenticated
    }
  },
  components: {
    LoggedOut,
    LoggedIn
  }
}
</script>

<style>

</style>
