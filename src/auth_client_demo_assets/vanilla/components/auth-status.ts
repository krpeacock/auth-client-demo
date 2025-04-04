export class AuthStatus extends HTMLElement {
  private content: HTMLElement;
  private closeButton: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <div class="toast">
        <span id="content"></span>
        <button class="close-button" type="button">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;

    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.content = this.shadowRoot?.querySelector("#content") as HTMLElement;
    this.closeButton = this.shadowRoot?.querySelector(
      ".close-button"
    ) as HTMLButtonElement;

    this.closeButton.addEventListener("click", () => this.hide());
  }

  show(message: string) {
    this.content.textContent = message;
    this.shadowRoot?.querySelector(".toast")?.classList.remove("hidden");
  }

  hide() {
    this.shadowRoot?.querySelector(".toast")?.classList.add("hidden");
  }
}

customElements.define("auth-status", AuthStatus);
