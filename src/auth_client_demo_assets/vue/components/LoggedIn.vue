<template>
  <div class="container">
    <h1>Internet Identity Client</h1>
    <h2>You are authenticated!</h2>
    <p>To see how a canister views you, click this button!</p>
    <button type="button" id="whoamiButton" class="primary" @click="whoamiCall">
      Who am I?
    </button>
    <input
      type="text"
      readonly
      id="whoami"
      placeholder="your Identity"
      :value="response"
    />
    <button id="logout" @click="logout">log out</button>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";

export default {
  name: "LoggedIn",
  setup() {
    const authStore = useAuthStore();
    const { whoamiActor, logout } = storeToRefs(authStore);
    return {
      whoamiActor,
      logout,
    };
  },
  methods: {
    whoamiCall() {
      const authStore = useAuthStore();
      authStore.whoamiActor.whoami().then((res) => {
        this.response = res;
      });
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
  data() {
    return {
      response: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#whoami {
  border: 1px solid #1a1a1a;
  margin-bottom: 1rem;
}
</style>
