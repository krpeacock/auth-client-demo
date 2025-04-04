import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "../config";

class AuthApp extends HTMLElement {
  private authStatus: HTMLElement | null = null;
  private loggedOut: HTMLElement;
  private loggedIn: HTMLElement;
  private authClient: AuthClient | null = null;

  constructor() {
    super();
    this.loggedOut = document.createElement("logged-out");
    this.loggedIn = document.createElement("logged-in");
  }

  async connectedCallback() {
    this.innerHTML = `
        <header id="header">
          <div id="status" class="toast hidden">
            <span id="content"></span>
            <button class="close-button" type="button">
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </header>
        <main id="pageContent"></main>
    `;

    this.authStatus = this.querySelector("#status") as HTMLElement;
    const pageContent = this.querySelector("#pageContent") as HTMLElement;

    try {
      this.authClient = await AuthClient.create(defaultOptions.createOptions);
      if (await this.authClient.isAuthenticated()) {
        this.showLoggedInView();
      } else {
        pageContent.appendChild(this.loggedOut);
      }
    } catch (error) {
      console.error("Failed to create auth client:", error);
      pageContent.appendChild(this.loggedOut);
    }

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.loggedOut.addEventListener("authenticated", (event: Event) => {
      const customEvent = event as CustomEvent;
      this.authClient = customEvent.detail.authClient;
      this.showLoggedInView();
    });

    this.loggedIn.addEventListener("logged-out", () => {
      this.showLoggedOutView();
    });

    const closeButton = this.querySelector(
      ".close-button"
    ) as HTMLButtonElement;
    closeButton.addEventListener("click", () => {
      if (this.authStatus) {
        this.authStatus.classList.add("hidden");
      }
    });
  }

  private showLoggedInView() {
    const pageContent = this.querySelector("#pageContent") as HTMLElement;
    pageContent.innerHTML = "";
    (this.loggedIn as any).setAuthClient(this.authClient!);
    pageContent.appendChild(this.loggedIn);
  }

  private showLoggedOutView() {
    const pageContent = this.querySelector("#pageContent") as HTMLElement;
    pageContent.innerHTML = "";
    pageContent.appendChild(this.loggedOut);
  }
}

customElements.define("auth-app", AuthApp);
