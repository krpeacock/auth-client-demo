<template>
  <div class="container">
  <h1>Internet Identity Client</h1>
  <h2>You are not authenticated</h2>
  <p>To log in, click this button!</p>
  <button type="button" id="loginButton" @click="login()">Log in</button>
</div>
</template>

<script>
import { useAuthStore } from "../store/index";

export default {
  name: 'LoggedOut',
  setup() {
    const mainStore = useAuthStore();
    let login = mainStore.login;

    return {
      login
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
