require! {
    \react
    \react-dom
    \../navigate.ls
    \../get-primary-info.ls
    \../web3.ls
    \bignumber.js
    \../get-lang.ls
    \../history-funcs.ls
    \../stake-funcs.ls : { query-pools }
    \./icon.ls
    \prelude-ls : { map, split, filter, find, foldl, sort-by, unique, head, each }
    \../math.ls : { div, times, plus, minus }
    \../../web3t/providers/deps.js : { hdkey, bip39 }
    \md5
    \../menu-funcs.ls
    \btoa
    \safe-buffer : { Buffer }
    \../copied-inform.ls
    \../copy.ls
    \../round5.ls
    \../../web3t/addresses.js : { ethToVlx }
    \./switch-account.ls
    \../round-human.ls
    \./exit-stake.ls
    \../icons.ls
    \./placeholder.ls
    \./claim-stake.ls
    \../staking/can-make-staking.ls
    \./epoch.ls
    \./confirmation.ls : { alert }
    \../components/button.ls
    \../components/address-holder.ls
    \./alert-txn.ls
    \../components/amount-field.ls
    \./move-stake.ls
    \../seed.ls : seedmem
    \../components/burger.ls
    \moment
}
cb = console.log
get-pair = (wallet, path, index, password, with-keystore)->
    w = wallet.derive-path(path).derive-child(index).get-wallet!
    address  = "0x" + w.get-address!.to-string(\hex)
    salt = Buffer.from('dc9e4a98886738bd8aae134a1f89aaa5a502c3fbd10e336136d4d5fe47448ad6', 'hex')
    iv = Buffer.from('cecacd85e9cb89788b5aab2f93361233', 'hex')
    uuid = Buffer.from('7e59dc028d42d09db29aa8a0f862cc81', 'hex')
    kdf = 'pbkdf2'
    #console.log \keystore, with-keystore
    keystore =
        | with-keystore => w.toV3String(password, { salt, iv, uuid, kdf })
        | _ => ""
    { address, keystore }
to-keystore = (store, with-keystore)->
    mnemonic = seedmem.mnemonic
    seed = bip39.mnemonic-to-seed(mnemonic)
    wallet = hdkey.from-master-seed(seed)
    index = store.current.account-index
    password = md5 wallet.derive-path("m1").derive-child(index).get-wallet!.get-address!.to-string(\hex)
    staking =
        | store.url-params.anotheracc? => { address: window.toEthAddress(store.url-params.anotheracc) }
        | _ => get-pair wallet, \m0 , index, password, no
    mining  = get-pair wallet, \m0/2 , index, password, with-keystore
    { staking, mining, password }
show-validator = (store, web3t)-> (validator)->
    react.create-element 'li', {}, ' ' + validator
nolocks-content = (store, web3t)->
    { go-back } = history-funcs store, web3t
    style = get-primary-info store
    lang = get-lang store
    pairs = store.staking.keystore
    become-validator = ->
        err, options <- get-options
        return alert store, err, cb if err?
        err <- can-make-staking store, web3t
        return alert store, err, cb if err?
        return alert store, "please choose the pool", cb if not store.staking.chosen-pool?
        type = typeof! store.staking.add.add-validator-stake
        return alert store, "please enter correct amount, got #{type}", cb if type not in <[ String Number ]>
        stake = store.staking.add.add-validator-stake `times` (10^18)
        data = web3t.velas.Staking.stake.get-data store.staking.chosen-pool.address, stake
        to = web3t.velas.Staking.address
        amount = store.staking.add.add-validator-stake
        err <- web3t.vlx2.send-transaction { to, data, amount }
        #return cb err if err?
        return store.staking.add.result = "#{err}" if err?
        <- staking.init { store, web3t }
    change-address = ->
        store.staking.add.add-validator = it.target.value
    change-stake = !->
        try
            value = new bignumber(it.target.value).toFixed!.to-string!
            store.staking.add.add-validator-stake = value
        catch err
            console.log "[Change-stake]: #{err}"
    return null if not pairs.mining?
    get-balance = ->
        wallet =
            store.current.account.wallets
                |> find -> it.coin.token is \vlx2
        wallet.balance
    get-options = (cb)->
        #i-am-staker = i-stake-choosen-pool!
        #return cb null if i-am-staker
        err, data <- web3t.velas.Staking.candidateMinStake
        return cb err if err?
        min =
            | +store.staking.stake-amount-total >= 10000 => 1
            | _ => data `div` (10^18)
        balance = get-balance! `minus` 0.1
        stake = store.staking.add.add-validator-stake
        return cb lang.amountLessStaking if 10000 > +stake
        return cb lang.balanceLessStaking if +balance < +stake
        max = +balance
        cb null, { min, max }
    use-min = ->
        #err, options <- get-options
        #return alert store, err, cb if err?
        store.staking.add.add-validator-stake = 10000
    use-max = ->
        #err, options <- get-options
        #return alert store, err, cb if err?
        store.staking.add.add-validator-stake = Math.max (get-balance! `minus` 0.1), 0
    vote-for-change = ->
        err, can <- web3t.velas.ValidatorSet.emitInitiateChangeCallable
        return alert store, err, cb if err?
        return alert store, lang.actionProhibited, cb if can isnt yes
        data = web3t.velas.ValidatorSet.emitInitiateChange.get-data!
        #console.log { data }
        to = web3t.velas.ValidatorSet.address
        amount = 0
        err <- web3t.vlx2.send-transaction { to, data, amount }
        store.current.page = \staking
    your-balance = " #{round-human get-balance!} "
    your-staking-amount = store.staking.stakeAmountTotal `div` (10^18)
    your-staking = " #{round-human your-staking-amount}"
    vlx-token = "VLX"
    choose-nolock = ->
        page = \choosestaker
        store.lockups.lockup-was-choosed = yes
        store.lockups.choosed-lockup = item
        item.checked = yes
        store.lockups.error = ""
        cb null
    build-nolock = (store, web3t)-> (item)->
        { address, lockedFunds, stake, lockedFundsReleaseTime } = item
        stake = round-human(parse-float item.stake `div` (10^18))
        index = store.lockups.lockupContracts.index-of(item) + 1  
        vlx2 =
            store.current.account.wallets |> find (.coin.token is \vlx2)
        wallet =
            address: ethToVlx item.address
            network: vlx2.network
            coin: vlx2.coin
        lockedUntil = if lockedFundsReleaseTime? then moment(lockedFundsReleaseTime).format("DD MM YYYY hh:mm") else ".."
        react.create-element 'tr', { className: "#{item.status}" }, children = 
            react.create-element 'td', {}, children = 
                react.create-element 'span', { className: "#{item.status} circle" }, ' ' + index
            react.create-element 'td', { datacolumn: 'Staker Address', title: "#{ethToVlx item.address}" }, children = 
                address-holder { store, wallet }
            react.create-element 'td', {}, ' ' + lockedFunds
            react.create-element 'td', {}, ' ' + stake + ' '
            react.create-element 'td', {}, ' ' + lockedUntil + '       '
            react.create-element 'td', {}, children = 
                button { store, on-click: choose-nolock , type: \secondary , icon : \arrowRight }
    cancel-pool = ->
        store.staking.chosen-pool = null
        store.staking.pool-was-choosed = no
    refresh = ->
        store.staking.all-pools-loaded = no
        if ((store.staking.all-pools-loaded is no or !store.staking.all-pools-loaded?) and store.staking.pools-are-loading is yes)
            return no
        store.staking.pools-are-loading = yes
        cb = console.log
        cb null, \done
    icon-style =
        color: style.app.loader
        margin-top: "10px"
        width: "inherit"
    staker-pool-style =
        max-width: 200px
        background: style.app.stats
    stats=
        background: style.app.stats
    react.create-element 'div', { className: 'staking-content delegate' }, children = 
        if not store.staking.pool-was-choosed and not store.lockups.lockup-was-choosed
            react.create-element 'div', { className: 'main-sections' }, children = 
                react.create-element 'div', { id: "lockups", className: 'form-group' }, children = 
                    react.create-element 'div', { className: 'section' }, children = 
                        react.create-element 'div', { className: 'title' }, children = 
                            react.create-element 'h3', {}, ' No-lock contracts'
                        react.create-element 'div', { className: 'description table-scroll no-lock' }, children = 
                            react.create-element 'table', {}, children = 
                                react.create-element 'thead', {}, children = 
                                    react.create-element 'th', { width: "3%", style: stats }, ' #'
                                    react.create-element 'th', { width: "40%", style: staker-pool-style }, ' Address'
                                    react.create-element 'th', { width: "20%", style: stats }, ' Locked Amount'
                                    react.create-element 'th', { width: "20%", style: stats }, ' Staked Amount'
                                    react.create-element 'th', { width: "10%", style: stats }, ' Locked Until'
                                    react.create-element 'th', { width: "9%", style: stats }, ' Select'
                                react.create-element 'tbody', {}, children = 
                                    store.lockups.lockupContracts |> map build-nolock store, web3t                            
        if store.lockups.lockup-was-choosed then
            react.create-element 'div', { className: 'none' }, ' Hello'
nolocks = ({ store, web3t })->
    react.create-element 'div', { className: 'nolocks-content' }, children = 
        nolocks-content store, web3t
stringify = (value) ->
    if value? then
        round-human(parse-float value `div` (10^18))
    else
        '..'
fill-lockup-contract = ({web3t, store},[contract, ...contracts], cb)->
    return cb null, [] if not contract? 
    item = {}
    TimeLock = web3t.velas.Timelock.at(contract)
    err, lockedFunds <- TimeLock.getLockedFunds!
    return cb err if err? 
    item.address = contract
    item.lockedFundsRaw = lockedFunds
    item.lockedFunds = if (+lockedFunds isnt 0) then round-human(parse-float lockedFunds `div` (10^18)) else 0
    item.status = \inactive
    err, lockedPool <- TimeLock.getPool!
    return cb err if err?
    item.lockedPool = lockedPool
    err, amount <- web3t.velas.Staking.stakeAmount lockedPool, contract
    return cb err if err?
    store.lockups.lockupStaking[lockedPool] = store.lockups.lockupStaking[lockedPool] ? []
    store.lockups.lockupStaking[lockedPool].push amount
    item.stake = amount
    err, lockedFundsReleaseTime <- TimeLock.getLockedFundsReleaseTime!
    return cb err if err?
    item.lockedFundsReleaseTime = lockedFundsReleaseTime
    _item = [item]
    err, rest <- fill-lockup-contract {web3t, store}, contracts
    all = _item ++ rest
    cb null, all
fill-lockup-contracts = ({web3t, store}, contracts, cb)->
    err, res <- fill-lockup-contract {web3t, store}, contracts
    return cb err if err?
    cb null, res
nolocks.init = ({ store, web3t }, cb)->
    store.lockups.lockup-was-choosed = no
    store.staking.pool-was-choosed = no
    vlx2 = store.current.account.wallets |> find (.coin.token is \vlx2)
    err, lockups <- web3t.velas.Resolver.getLockups vlx2.address2  
    return cb err if err?
    store.lockups.lockupStaking = {}
    err, result <- fill-lockup-contracts {web3t, store}, lockups
    return cb err if err?
    store.lockups.lockupContracts = result
    cb null 
module.exports = nolocks
#V31V1kD7DpT9eoRcdXf7T1fbFqcNh