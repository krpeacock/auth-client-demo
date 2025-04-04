import { AuthClient } from "@dfinity/auth-client";
import "./components/auth-status";
import "./components/login-form";
import "./components/authenticated-view";
import { getIdentityProvider, defaultOptions } from "./config";

class AuthApp extends HTMLElement {
  private authStatus: HTMLElement | null = null;
  private loginForm: HTMLElement;
  private authenticatedView: HTMLElement;
  private authClient: AuthClient | null = null;

  constructor() {
    super();
    this.loginForm = document.createElement("login-form");
    this.authenticatedView = document.createElement("authenticated-view");
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
        this.showAuthenticatedView();
      } else {
        pageContent.appendChild(this.loginForm);
      }
    } catch (error) {
      console.error("Failed to create auth client:", error);
      pageContent.appendChild(this.loginForm);
    }

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.loginForm.addEventListener("authenticated", (event: Event) => {
      const customEvent = event as CustomEvent;
      this.authClient = customEvent.detail.authClient;
      this.showAuthenticatedView();
    });

    this.authenticatedView.addEventListener("logged-out", () => {
      this.showLoginForm();
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

  private showAuthenticatedView() {
    const pageContent = this.querySelector("#pageContent") as HTMLElement;
    pageContent.innerHTML = "";
    (this.authenticatedView as any).setAuthClient(this.authClient!);
    pageContent.appendChild(this.authenticatedView);
  }

  private showLoginForm() {
    const pageContent = this.querySelector("#pageContent") as HTMLElement;
    pageContent.innerHTML = "";
    pageContent.appendChild(this.loginForm);
  }
}

customElements.define("auth-app", AuthApp);
