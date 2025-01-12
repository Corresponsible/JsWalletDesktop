export mainnet =
    decimals: 8
    tx-fee: \0.00001
    tx-fee-auto-mode: \per-byte
    tx-fee-options: 
        auto: \0.00001
        cheap: \0.00001
        instant-per-input: \0.0001
        instant-service-price: 0
        private-per-input: \0.005
        private-service-price: \0.025
        fee-per-byte: \0.00000001
    mask: '1000000000000000000000000000000000'
    api:
        provider: \insight
        url: \https://insight.gobyte.network
        api-name: \insight-api-gobyte
        mixing-list: "https://explorer.gobyte.network:5002/api/masternodelist"
        decimal: 8
    message-prefix: '\x18GoByte Signed Message:\n'
    bech32: 'bc'
    bip32:
        public: 0x488b21e
        private: 0x488ade4
    pubKeyHash: 0x26 #38 base58Prefixes[PUBKEY_ADDRESS]
    scriptHash: 0x10 #16 base58Prefixes[SCRIPT_ADDRESS]
    wif: 0xc6 #198 base58Prefixes[SECRET_KEY]
    dust-threshold: 5460
export testnet =
    tx-fee: \0.00005
    tx-fee-options:
        fast: \0.00005
        cheap: \0.00001
        instant-per-input: \0.0001
        private-per-input: \0.005
        fee-per-byte: \0.00000001
    decimals: 8
    mask: 'n000000000000000000000000000000000'
    api:
        provider: \insight
        url: \https://texplorer.gobyte.network:4001
        api-name: \insight-api-gobyte
        decimal: 8
    messagePrefix: '\x18GoByte Signed Message:\n'
    topup: \https://testnet.manu.backend.hamburg/faucet
    bech32: 'tb'
    bip32:
        public: 0x043587cf
        private: 0x04358394
    pubKeyHash: 0x70 #base58Prefixes[PUBKEY_ADDRESS]
    scriptHash: 0x14 #base58Prefixes[SCRIPT_ADDRESS]
    wif: 0xf0 #base58Prefixes[SECRET_KEY]
    dust-threshold: 5460
export tx-types = <[ regular instant ]>
export color = \#545DF1
export type = \coin
export enabled = true
export name = 'Gobyte'
export nickname = 'gbx'
export token = \gbx
export image = "data:image/png;base64,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"
export usd-info = "url(https://explorer.velas.com/ticker).gbx_price"