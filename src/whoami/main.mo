actor {
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };
};
