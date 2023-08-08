import "zx/globals";

echo("Building canisters");
await $`dfx build --network ic`;

echo("Copying to dist");
await $`mkdir -p dist`;
await $`cp .dfx/ic/canisters/whoami/whoami.wasm dist/whoami.wasm`;
await $`cp .dfx/ic/canisters/whoami/whoami.did dist/whoami.did`;

await $`cp .dfx/ic/canisters/auth_client_demo_assets/auth_client_demo_assets.wasm dist/auth_client_demo_assets.wasm`;
await $`cp .dfx/ic/canisters/auth_client_demo_assets/auth_client_demo_assets.did dist/auth_client_demo_assets.did`;

echo("Done");
