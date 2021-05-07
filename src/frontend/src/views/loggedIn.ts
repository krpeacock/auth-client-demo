import { ActorSubclass } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { html, render } from "lit-html";
import { _SERVICE } from "../did";

const content = () => html`<div class="container">
  <h1>Internet Identity Client</h1>
  <h2>You are authenticated!</h2>
  <p>To see how a canister views you, click this button!</p>
  <button type="button" id="whoamiButton">Who am I?</button>
  <section id="whoami"></section>
</div>`;

export const renderLoggedIn = (
  actor: ActorSubclass<_SERVICE>,
  authClient: AuthClient
) => {
  render(content(), document.getElementById("pageContent") as HTMLElement);

  (document.getElementById(
    "whoamiButton"
  ) as HTMLButtonElement).onclick = async () => {
    const response = await actor.whoami();
    (document.getElementById(
      "whoami"
    ) as HTMLElement).innerText = response.toString();
  };
};
