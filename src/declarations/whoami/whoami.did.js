export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'whoami' : IDL.Func([], [IDL.Principal], []) });
};
export const init = ({ IDL }) => { return []; };
