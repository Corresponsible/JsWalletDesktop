export mainnet = 
    decimals: 8
    tx-fee: \0.0001
    tx-fee-options:
        auto: \0.0001
        cheap: \0.000014
    mask: 'L000000000000000000000000000000000'
    api: 
        provider: \insight
        url: \https://insight.litecore.io
        decimal: 8
    message-prefix: '\x19Litecoin Signed Message:\n'
    bip32:
        public: 0x019da462
        private: 0x019d9cfe
    pub-key-hash: 0x30
    script-hash: 0x32
    wif: 0xb0
export testnet = 
    decimals: 8
    tx-fee: \0.0001
    tx-fee-options: 
        auto: \0.0001
        cheap: \0.000014
    topup: \https://litecoin-faucet.com/
    mask: 'n000000000000000000000000000000000'
    api: 
        provider: \insight
        url: \https://testnet.litecore.io
        decimal: 8
    message-prefix: '\x19Litecoin Signed Message:\n'
    bip32:
        public: 0x0436ef7d
        private: 0x0436f6e1
    pub-key-hash: 0x6f
    script-hash: 0xc4
    wif: 0xef
export color = \#a04b55
export type = \coin    
export enabled = yes
export token = \ltc
export image = "data:image/png;base64,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"
export usd-info = "url(https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH,XEM,USDT,ETC&tsyms=USD).LTC.USD"