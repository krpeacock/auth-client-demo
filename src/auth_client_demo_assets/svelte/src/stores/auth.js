import { readable } from "svelte/store";

/**
 * @typedef {Object} Auth
 * @property {boolean} isAuthenticated
 * @property {() => void} login
 * @property {() => void} logout
 *
 */

const initialAuth = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

/**
 * This is a simple auth store that is used to demonstrate how to use
 * the auth store in a SvelteKit app.
 * @type {import("svelte/store").Readable<Auth>}
 */
export const auth = readable(initialAuth, (set) => {
  const auth = {
    isAuthenticated: false,
    login: () => {
      auth.isAuthenticated = true;
      set(auth);
    },
    logout: () => {
      auth.isAuthenticated = false;
      set(auth);
    },
  };
  set(auth);
});
