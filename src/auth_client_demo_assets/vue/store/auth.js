import { defineStore } from "pinia";
import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../declarations/whoami";

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}#authorize`,
  },
};

function actorFromIdentity(identity) {
  return createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
}

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => {
    return {
      isAuthenticated: null,
      authClient: null,
      identity: null,
      whoamiActor: null,
    };
  },
  actions: {
    async init() {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      this.authClient = authClient;
      const isAuthenticated = await authClient.isAuthenticated();
      const identity = isAuthenticated ? authClient.getIdentity() : null;
      const whoamiActor = identity ? actorFromIdentity(identity) : null;

      this.isAuthenticated = isAuthenticated;
      this.identity = identity;
      this.whoamiActor = whoamiActor;
    },
    async login() {
      /*
       * Note: for Vue, a proxy of the authClient cannot be used for "login"
       * because the `postMessage` API is interfered with. We can re-create the client for the login, and then set it after the login is complete.
       * All other auth-client methods and attributes can use the proxy.
       */
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: async () => {
          // Set the authClient after the login is complete
          this.authClient = authClient;

          this.isAuthenticated = await authClient.isAuthenticated();
          this.identity = this.isAuthenticated
            ? authClient.getIdentity()
            : null;
          this.whoamiActor = this.identity
            ? actorFromIdentity(this.identity)
            : null;
        },
      });
    },
    async logout() {
      // eslint-disable-next-line no-unused-vars
      const authClient = (await this.$state).authClient;
      await authClient.logout();
      this.isAuthenticated = false;
      this.identity = null;
      this.whoamiActor = null;
    },
  },
});
