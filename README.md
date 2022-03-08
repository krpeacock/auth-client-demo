# Auth-Client Demo

This is an example project, intended to demonstrate how an app developer might integrate with an [Internet Identity](https://identity.ic0.app).

For a non-typescript implementation, see https://github.com/krpeacock/auth-client-demo/tree/vanilla-js

[Live demo](https://vasb2-4yaaa-aaaab-qadoa-cai.ic0.app/)

This is an example showing how to use [@dfinity/auth-client](https://www.npmjs.com/package/@dfinity/auth-client).

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with auth_demo, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)

## Setting up for local development

To get started, start a local dfx development environment in this directory with the following steps:

```bash
cd auth-client-demo/
dfx start --background --clean
dfx deploy
```

Then, make sure you have the [Internet Identity](https://github.com/dfinity/internet-identity) repo cloned locally, adjacent to this project. 

```bash
cd ../internet-identity
rm -rf .dfx/local
II_FETCH_ROOT_KEY=1 II_DUMMY_CAPTCHA=1  dfx deploy --no-wallet --argument '(null)'
pushd
```

Copy the canister ID fom the Internet Identity canister, and paste it into `webpack.config.js` in this project on the `LOCAL_II_CANISTER` variable on line `8`.

Finally, cd back into the auth-client-demo directory and start the development server with `npm start`.

You can now access the app at `http://localhost:8080`.
