import type { Principal } from "@dfinity/agent";
export default ({ IDL }) => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], []) });
};

export interface _SERVICE {
  whoami: () => Promise<Principal>;
}
