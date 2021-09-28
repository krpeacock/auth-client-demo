import { AuthClient } from "@dfinity/auth-client";
import { renderIndex } from "./views";
import { renderLoggedIn } from "./views/loggedIn";
import { canisterId, createActor } from "../../declarations/whoami";

const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }
  renderIndex();

  const loginButton = document.getElementById(
    "loginButton"
  ) as HTMLButtonElement;

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  loginButton.onclick = async () => {
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : process.env.LOCAL_II_CANISTER,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    });
  };
};

async function handleAuthenticated(authClient: AuthClient) {
  const identity = await authClient.getIdentity();
  const whoami_actor = createActor(canisterId as string, {
    agentOptions: {
      identity,
    },
  });

  renderLoggedIn(whoami_actor, authClient);
}

init();
