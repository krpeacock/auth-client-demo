import { Actor, HttpAgent } from "@dfinity/agent";
import idlFactory from "./did";
import type { _SERVICE } from "./did";

const agent = new HttpAgent();
const whoami = Actor.createActor<_SERVICE>(idlFactory, {
  agent,
  canisterId: process.env.CANISTER_ID as string,
});
