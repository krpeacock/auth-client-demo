import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as auth_demo_idl, canisterId as auth_demo_id } from 'dfx-generated/auth_demo';

const agent = new HttpAgent();
const auth_demo = Actor.createActor(auth_demo_idl, { agent, canisterId: auth_demo_id });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  const greeting = await auth_demo.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
