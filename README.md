# Auth-Client Demo

This is an example project, intended to demonstrate how an app developer might integrate with an [Internet Identity](https://identity.ic0.app).

For a non-typescript implementation, see https://github.com/krpeacock/auth-client-demo/tree/vanilla-js

[Live demo](https://vasb2-4yaaa-aaaab-qadoa-cai.ic0.app/)

This is an example showing how to use [@dfinity/auth-client](https://www.npmjs.com/package/@dfinity/auth-client).

## Setting up for local development

To get started, start a local dfx development environment in this directory with the following steps:

```bash
cd auth-client-demo/
dfx start --background --clean
dfx deploy
```

Once deployed, start the development server with `npm start`.

You can now access the app at `http://localhost:8080`.

## Multiple Versions

This demo has multiple versions, each of which demonstrates a different feature of the auth-client. `npm start` will run the vanilla JS version, but you can run the others by running `npm run start:version` where `version` is one of the following:

- React
- Vue
- Vanilla
- Svelte
