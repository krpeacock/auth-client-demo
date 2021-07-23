import { html, render } from "lit-html";
const content = html`<div class="container">
  <h1>Internet Identity Client</h1>
  <h2>You are not authenticated</h2>
  <p>To log in, click this button!</p>
  <button type="button" id="loginButton">Log in</button>
</div>`;

export const renderIndex = async () => {
  render(content, document.getElementById("pageContent") as HTMLElement);
};
