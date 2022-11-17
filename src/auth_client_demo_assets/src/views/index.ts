import { html, render } from "lit-html";

const content = html`<div class="container">
  <h1>Internet Identity Client</h1>
  <h2>You are not authenticated</h2>
  <p>To log in, click this button!</p>
  <button type="button" id="loginButton">Log in</button>
</div>`;

export const renderIndex = async (statusMessage?: string) => {
  const pageContent = document.getElementById("pageContent");
  if (pageContent) {
    render(content, pageContent);
  }

  const status = document.getElementById("status");
  const statusContent = document.getElementById("content");
  if (statusMessage && statusContent) {
    render(statusMessage, statusContent);
    status?.classList.remove("hidden");
  } else {
    status?.classList.add("hidden");
  }
};
