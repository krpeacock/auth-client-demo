import { AuthClient } from "@dfinity/auth-client";
import { getIdentityProvider, defaultOptions } from "../config";

class LoggedOut extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="container">
        <h1>Internet Identity</h1>
        <h2>You are not authenticated</h2>
        <p>To log in, click the button below.</p>
        <button type="button" id="loginButton">Login</button>
      </div>
    `;

    const loginButton = this.querySelector("#loginButton") as HTMLButtonElement;
    loginButton.addEventListener("click", () => this.handleLogin());
  }

  private async handleLogin() {
    try {
      const authClient = await AuthClient.create(defaultOptions.createOptions);
      await authClient.login({
        identityProvider: getIdentityProvider(),
        onSuccess: () => {
          this.dispatchEvent(
            new CustomEvent("authenticated", {
              detail: { authClient },
              bubbles: true,
              composed: true,
            })
          );
        },
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
}

customElements.define("logged-out", LoggedOut);
