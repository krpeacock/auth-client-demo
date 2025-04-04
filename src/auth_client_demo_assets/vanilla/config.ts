// Time in nanoseconds
export const DAYS = BigInt(24) * BigInt(60) * BigInt(60) * BigInt(1000000000);
export const HOURS = BigInt(60) * BigInt(60) * BigInt(1000000000);
export const NANOSECONDS = BigInt(1000000000);

export const getIdentityProvider = () => {
  let idpProvider;
  // Safeguard against server rendering
  if (typeof window !== "undefined") {
    const isLocal = process.env.DFX_NETWORK !== "ic";
    // Safari does not support localhost subdomains
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isLocal && isSafari) {
      idpProvider = `http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`;
    } else if (isLocal) {
      idpProvider = `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`;
    }
  }
  return idpProvider;
};

export const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider: getIdentityProvider(),
  },
};
