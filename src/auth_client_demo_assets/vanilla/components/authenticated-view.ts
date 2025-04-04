import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { getIdentityProvider } from "../config";
import { createActor } from "../../../declarations/whoami";

class AuthenticatedView extends HTMLElement {
  private authClient: AuthClient | null = null;
  private whoamiActor: any = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="container">
        <h1>Internet Identity</h1>
        <h2>You are authenticated!</h2>
        <p>Your principal ID is displayed below.</p>
        <button type="button" id="whoamiButton" class="primary">Who am I?</button>
        <input id="whoami" placeholder="Your Principal ID" readonly />
        <button type="button" id="logoutButton">Logout</button>
      </div>
    `;

    const whoamiButton = this.querySelector(
      "#whoamiButton"
    ) as HTMLButtonElement;
    const whoamiInput = this.querySelector("#whoami") as HTMLInputElement;
    const logoutButton = this.querySelector(
      "#logoutButton"
    ) as HTMLButtonElement;

    whoamiButton.addEventListener("click", () =>
      this.handleWhoami(whoamiInput)
    );
    logoutButton.addEventListener("click", () => this.handleLogout());
  }

  async setAuthClient(authClient: AuthClient) {
    this.authClient = authClient;
    this.whoamiActor = createActor(process.env.CANISTER_ID_WHOAMI!, {
      agent: await HttpAgent.create({
        host: getIdentityProvider(),
        identity: await authClient.getIdentity(),
      }),
    });

    // Invalidate identity when user goes idle
    authClient.idleManager?.registerCallback(() => {
      Actor.agentOf(this.whoamiActor!)?.invalidateIdentity?.();
      this.dispatchEvent(
        new CustomEvent("logged-out", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  private async handleWhoami(whoamiInput: HTMLInputElement) {
    if (!this.whoamiActor) {
      return;
    }

    try {
      const principal = await this.whoamiActor.whoami();
      whoamiInput.value = principal.toString();
    } catch (error) {
      console.error("Error calling whoami:", error);
    }
  }

  private async handleLogout() {
    if (!this.authClient) {
      return;
    }

    try {
      await this.authClient.logout();
      this.dispatchEvent(
        new CustomEvent("logged-out", {
          bubbles: true,
          composed: true,
        })
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}

customElements.define("authenticated-view", AuthenticatedView);
