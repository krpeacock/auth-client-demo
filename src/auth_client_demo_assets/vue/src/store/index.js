import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      console.log("login");
      // TODO: implement login
      this.isAuthenticated = true;
    },
    logout() {
      // TODO: implement logout
      this.isAuthenticated = false;
    },
  },
});
