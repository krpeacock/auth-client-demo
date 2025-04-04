// Time in nanoseconds
export const DAYS = BigInt(24) * BigInt(60) * BigInt(60) * BigInt(1000000000);
export const HOURS = BigInt(60) * BigInt(60) * BigInt(1000000000);
export const NANOSECONDS = BigInt(1000000000);

export function getIdentityProvider(): string {
  if (typeof window === "undefined") {
    return "http://localhost:4943";
  }

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname.endsWith(".localhost");
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isLocal) {
    return "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943";
  }

  if (isSafari) {
    return "https://rdmx6-jaaaa-aaaaa-aaadq-cai.ic0.app";
  }

  return "https://rdmx6-jaaaa-aaaaa-aaadq-cai.icp0.io";
}

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
