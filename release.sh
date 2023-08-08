echo "Building canisters"
dfx build --network ic

echo "Copying to dist"
mkdir -p dist
cp .dfx/ic/canisters/whoami/whoami.wasm dist/whoami.wasm
cp .dfx/ic/canisters/whoami/whoami.did dist/whoami.did

cp .dfx/ic/canisters/auth_client_demo_assets/auth_client_demo_assets.wasm dist/auth_client_demo_assets.wasm
cp .dfx/ic/canisters/auth_client_demo_assets/auth_client_demo_assets.did dist/auth_client_demo_assets.did

echo "Done"
