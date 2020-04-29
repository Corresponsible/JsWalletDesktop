require! {
    \react
    \react-dom
    \superagent : { get }
    \../navigate.ls
    \../get-primary-info.ls
    \../web3.ls
    \../get-lang.ls
    \../history-funcs.ls
    \./icon.ls
    \prelude-ls : { map, split, filter, find, foldl }
    \../math.ls : { div, times, plus, minus }
    \../velas/velas-web3.ls
    \../velas/velas-node-template.ls
    \../../web3t/providers/deps.js : { hdkey, bip39 }
    \md5
    \../menu-funcs.ls
    \btoa
    \safe-buffer : { Buffer }
    \react-copy-to-clipboard : { CopyToClipboard }
    \../copied-inform.ls
    \../copy.ls
    \../address-link.ls : { get-address-link, get-address-title }
    \../round5.ls
    \../round-human.ls
    \../../web3t/addresses.js : { ethToVlx }
    \./switch-account.ls
    \../icons.ls
    \./exit-stake.ls
    \./placeholder.ls
    \./claim-stake.ls
    \mobx : { transaction }
}
# .staking1244390431
#     @import scheme
#     color: white
#     position: relative
#     display: block
#     width: auto
#     margin-left: 60px
#     top: 0
#     height: auto
#     min-height: 100vh
#     padding-top: 5%
#     box-sizing: border-box
#     padding: 0px
#     background: transparent
#     .pad
#         padding: 0 5px
#     .pad-bottom
#         padding-bottom: 5px
#     @media(max-width:800px)
#         width: 100%
#         margin: 0
#     .staking-content
#         overflow: hidden
#         background: transparent
#         width: 100%
#         border-radius: 0px
#         position: relative
#         box-sizing: border-box
#         .claim-table
#             margin: 15px 0
#             max-height: 100px
#             width: 300px
#             overflow-y: auto
#             background: rgb(90, 26, 154)
#             @media(max-width:800px)
#                 margin: 15px auto
#             tbody
#                 background: rgb(45, 15, 85)
#             table
#                 width: 100%
#                 tr
#                     padding: 0
#                     margin: 0
#                     td
#                         width: 33%
#                         &:first-child
#                             text-align: center
#         .left-proxy, .right-proxy
#             width: 15px
#             height: 16px
#             line-height: 10px
#             display: inline-block
#             color: white
#             padding: 9px
#             border-radius: 0px
#             cursor: pointer
#             vertical-align: top
#             text-align: center
#         .form-group
#             text-align: center
#             padding-top: 0px
#             overflow-y: auto
#             input, textarea
#                 margin: 5px 0
#                 outline: none
#             .section
#                 border-bottom: 1px solid rgba(240, 237, 237, 0.16)
#                 padding: 30px 20px
#                 display: flex
#                 @media (max-width: 800px)
#                     display: flow-root
#                     padding: 20px
#                 &:last-child
#                     border: 0
#                 &.reward
#                     background-image: $reward
#                     background-repeat: no-repeat
#                     background-position: 16%
#                     background-size: auto
#                     background-color: rgba(111, 50, 162, 0.15)
#                     @media(max-width: 800px)
#                         background-position: 5%
#                     @media(max-width: 540px)
#                         background-image: none
#                 .title
#                     padding: 0px
#                     width: 30%
#                     text-align: left
#                     text-transform: uppercase
#                     font-size: 14px
#                     @media (max-width: 800px)
#                         width: 100%
#                         margin-bottom: 20px
#                         text-align: center
#                     .less
#                         font-size: 10px
#                         opacity: 0.9
#                 .description
#                     padding: 0px
#                     font-size: 14px
#                     width: 70%
#                     text-align: left
#                     .table
#                         width: 240px
#                         .balance
#                             text-align: right
#                             .header
#                                 float: left
#                     hr
#                         margin: 15px auto
#                         border: 1px solid rgba(240, 237, 237, 0.16)
#                         border-top: 0
#                     .chosen-pool
#                         margin-bottom: 10px
#                         .color
#                             color: orange
#                             font-weight: 600
#                             &.green
#                                 color: green
#                     &.table-scroll
#                         overflow-x: scroll
#                         max-height: 200px
#                         background: linear-gradient(#321260 30%, rgba(50, 18, 96, 0)), linear-gradient(rgba(50, 18, 96, 0), #321260 70%) 0 100%, radial-gradient(farthest-side at 50% 0, #594aaa, rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 50% 100%, #594aaa, rgba(0, 0, 0, 0)) 0 100%
#                         background-repeat: no-repeat
#                         background-attachment: local, local, scroll, scroll
#                         background-size: 100% 30px, 100% 30px, 100% 15px, 100% 15px
#                         animation: breathe 3s ease-in infinite
#                         -moz-transition: breathe 3s ease-in infinite
#                         -web-kit-transition: breathe 3s ease-in infinite
#                     table
#                         width: 100%
#                         border-collapse: collapse
#                         margin: 0px auto
#                     tr:nth-of-type(odd)
#                         background: rgba(107, 38, 142, 0.2)
#                     th
#                         background: rgb(67, 32, 124)
#                         color: white
#                         font-weight: 400
#                         &:first-child
#                             text-align: center
#                             width: 5%
#                         &:nth-child(2)
#                             width: 25%
#                         &:nth-child(3)
#                             width: 45%
#                         &:nth-child(4)
#                             width: 15%
#                     td, th
#                         padding: 10px
#                         border: 1px solid rgba(240, 237, 237, 0.16)
#                     .left
#                         position: relative
#                         .small-btns
#                             line-height: 36px
#                             button.small
#                                 outline: none
#                                 border-radius: 0px
#                                 line-height: 10px
#                                 text-align: center
#                                 height: 16px
#                                 font-size: 10px
#                                 font-weight: 600
#                                 margin-top: 0
#                                 width: auto
#                                 margin-right: 10px
#                                 padding: 2px 5px
#                                 cursor: pointer
#                     @media (max-width: 800px)
#                         width: 100%
#                         text-align: center
#                     .important
#                         color: orange
#                     .left-node
#                         width: 40%
#                         float: left
#                         @media (max-width: 800px)
#                             width: 100%
#                             text-align: center
#                             margin-bottom: 20px
#                         @media (min-width: 801px) and (max-width: 992px)
#                             width: 50%
#                         img
#                             width: 240px
#                             &.icon-svg
#                                 height: 12px
#                                 width: auto
#                                 padding-right: 5px
#                     .right-node
#                         width: 60%
#                         float: right
#                         @media (max-width: 800px)
#                             width: 100%
#                             text-align: center
#                         @media (min-width: 801px) and (max-width: 992px)
#                             width: 50%
#                             text-align: left
#                     &.node
#                         width: 80%
#                     .tabs
#                         display: inline-block
#                         margin: 20px 0 20px
#                         width: 100%
#                         .tab
#                             width: 25%
#                             display: inline-block
#                             opacity: 0.5;
#                             text-align: center
#                             border-bottom: 1px solid
#                             line-height: 37px
#                             text-transform: uppercase
#                             font-size: 10px
#                             font-weight: bold
#                             cursor: pointer
#                             height: 36px
#                             background: #2c0d5f
#                             border-color: #6b258e
#                             @media (max-width: 800px)
#                                 width: 50%
#                             &.active
#                                 opacity: 1
#                                 border-bottom: 1px solid #6e1d96
#                                 background: #37156d
#                     .btn
#                         margin: 10px 0
#                     .code
#                         overflow: scroll
#                         background: #1b1b1b
#                         text-align: left
#                         .copy
#                             float: right
#                             margin-top: 11px
#                             margin-right: 10px
#                             width: 15px
#                         .cursor
#                             -webkit-animation: blink 0.9s infinite
#                             animation: blink 0.9s infinite
#                             font: initial
#                             display: inline-block
#                             opacity: 1
#                             margin-left: 5px
#                         @-webkit-keyframes blink
#                             0%
#                                 opacity: 1
#                             50%
#                                 opacity: 0
#                             100%
#                                 opacity: 1
#                         @keyframes blink
#                             0%
#                                 opacity: 1
#                             50%
#                                 opacity: 0
#                             100%
#                                 opacity: 1
#                         &.comming
#                             background: transparent
#                             text-align: center
#                     .window
#                         position: sticky
#                         top: 0
#                         left: 0
#                         height: 39px
#                         background: #040404
#                         .icons
#                             padding: 0.75em
#                             position: absolute
#                             span
#                                 background: #040404
#                             &:before
#                                 content: ""
#                                 background: #040404
#                             &:after
#                                 content: ""
#                                 background: #040404
#                             span, &:before, &:after
#                                 display: inline-block
#                                 float: left
#                                 width: 1em
#                                 height: 1em
#                                 border-radius: 50%
#                                 margin-right: 0.5em
#                     .balance
#                         font-size: 14px
#                         margin-bottom: 5px
#                         span
#                             margin-right: 5px
#                             &.green
#                                 color: #3cd5af
#                         .color
#                             color: orange
#                             font-weight: 600
#                         .label-coin
#                             left: 3px
#                             top: 2px
#                             padding-right: 2px
#                             height: 15px
#                             position: relative
#                             color: orange
#                             font-weight: 600
#                     textarea
#                         border: 0
#                         padding: 10px
#                         font-size: 13px
#                         width: 100%
#                         box-sizing: border-box
#                         min-height: 120px
#                         font-family: monospace
#                 .content
#                     width: 30%
#                     position: relative
#                     button, .switch-index
#                         margin: 0
#                         position: absolute
#                         top: 50%
#                         left: 40%
#                         -ms-transform: translateY(-50%)
#                         transform: translateY(-50%)
#             .center
#                 text-align: center
#             .left
#                 text-align: left
#             label
#                 font-size: 13px
#             h3
#                 font-size: 12px
#                 text-transform: uppercase
#                 letter-spacing: 2px
#                 opacity: .8
#                 font-weight: 400
#                 margin: 0
#             input[type="checkbox"]
#                 height: auto
#                 width: auto
#                 margin: 0 40%
#                 cursor: pointer
#             input
#                 outline: none
#                 width: 100%
#                 box-sizing: border-box
#                 height: 36px
#                 line-height: 36px
#                 border-radius: 0
#                 padding: 0px 10px
#                 font-size: 14px
#                 margin: 5px 0
#                 border: 0px
#                 box-shadow: none
#                 &.change-index
#                     margin: 0 !important
#                     border-radius: 0px
#                     height: 36px
#                     width: 55px
#                     line-height: 36px
#                     text-align: center
#                     font-size: 13px
#     .warning
#         border: 1px solid orange
#         padding: 5px
#         background: rgba(orange, 0.1)
#         margin: 10px 0
#         display: inline-block
#     ol
#         padding: 0 25px
#         margin: 5px 0
#     ul
#         padding: 0
#         margin: 0
#         min-width: 100%
#         max-width: 300px
#         li 
#             list-style: none
#             margin-left: 0
#             font-size: 13px
#             color: #fff
#             font-size: 14px
#             margin-bottom: 5px
#             list-style-position: inside
#             white-space: nowrap
#             overflow: hidden
#             text-overflow: ellipsis
#             @media (max-width: 800px)
#                 text-align: center
#     button
#         background-color: $primary
#         border: 1px solid $primary
#         border-radius: $border
#         color: white
#         height: 36px
#         width: 130px
#         margin-top: 10px
#         padding: 0 6px
#         text-decoration: none
#         text-transform: uppercase
#         font-size: 10px
#         font-weight: bold
#         cursor: pointer
#         outline: none
#         display: inline-block
#         text-overflow: ellipsis
#         overflow: hidden
#         white-space: nowrap
#         &.btn-width
#             width: auto
#             padding: 0 10px
#         &.mt-0
#             margin-top: 0
#         &:hover
#             background: transparent
#             color: $primary
#         &.link
#             min-width: 190px
#     >.title
#         position: sticky
#         z-index: 1
#         background: linear-gradient(100deg, rgb(51, 20, 98) 4%, rgb(21, 6, 60) 100%)
#         box-sizing: border-box
#         top: 0
#         width: 100%
#         color: gray
#         font-size: 22px
#         padding: 10px
#         height: 60px
#         >.header
#             margin: 5px
#             text-align: center
#             @media(max-width:800px)
#                 text-align: center
#         >.close
#             position: absolute
#             font-size: 20px
#             left: 20px
#             top: 13px
#             cursor: pointer
#             &:hover
#                 color: #CCC
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
    mnemonic = store.current.seed
    seed = bip39.mnemonic-to-seed(mnemonic)
    wallet = hdkey.from-master-seed(seed)
    index = store.current.account-index
    password = md5 wallet.derive-path("m1").derive-child(index).get-wallet!.get-address!.to-string(\hex)
    staking = get-pair wallet, \m0 , index, password, no
    mining  = get-pair wallet, \m0/2 , index, password, with-keystore
    { staking, mining, password }
show-validator = (store, web3t)-> (validator)->
    react.create-element 'li', {}, ' ' + validator
staking-content = (store, web3t)->
    style = get-primary-info store
    lang = get-lang store
    input-style =
        background: style.app.wallet
        color: style.app.text
        overflow-x: \auto
        margin-top: \10px
    button-primary2-style=
        border: "1px solid #{style.app.primary2}"
        color: style.app.text
        background: style.app.primary2
    button-primary3-style=
        border: "1px solid #{style.app.primary3}"
        color: style.app.text2
        background: style.app.primary3
    button-primary4-style=
        border: "1px solid #{style.app.primary4}"
        color: style.app.text
        background: style.app.primary4
    filter-icon=
        filter: style.app.filterIcon
    comming-soon =
        opacity: ".3"
    pairs = store.staking.keystore
    become-or-extend-validator = (stake, pairs, cb)->
        err, pool <- web3t.velas.Staking.getStakerPools(pairs.staking.address)
        return cb err if err?
        console.log pool
        return cb null, web3t.velas.Staking.add-pool.get-data(stake, pairs.mining.address) if pool.length is 0
        cb null, web3t.velas.Staking.stake.get-data(pairs.staking.address, stake)
    become-validator = ->
        err, data <- web3t.velas.Staking.areStakeAndWithdrawAllowed!
        return cb err if err?
        return alert "Staking is not allowed. Please wait for epoch change" if data isnt yes
        stake = store.staking.add.add-validator-stake `times` (10^18)
        #console.log stake, pairs.mining.address
        #data = web3t.velas.Staking.stake.get-data pairs.staking.address, stake
        err, data <- become-or-extend-validator stake, pairs
        return alert "#{err}" if err?
        to = web3t.velas.Staking.address
        #console.log \to, { to, data, amount }
        amount = store.staking.add.add-validator-stake
        err <- web3t.vlx2.send-transaction { to, data, amount, gas: 4600000, gas-price: 1000000 }
        #return cb err if err?
        return store.staking.add.result = "#{err}" if err?
        #store.staking.add.result = "success"
        <- staking.init { store, web3t }
    change-address = ->
        store.staking.add.add-validator = it.target.value
    change-stake = ->
        store.staking.add.add-validator-stake = it.target.value
    velas-node-applied-template = 
        pairs
            |> velas-node-template 
            |> split "\n"
    velas-node-applied-template-line = 
        pairs
            |> velas-node-template
            |> btoa
            |> -> "echo '#{it}' | base64 --decode | sh"
    return null if not pairs.mining?
    show-script = ->
        store.staking.keystore = to-keystore store, yes
    {  account-left, account-right, change-account-index } = menu-funcs store, web3t
    update-current = (func)-> (data)->
        func data
        <- staking.init { store, web3t }
        store.staking.keystore = to-keystore store, no
    account-left-proxy   = update-current account-left
    account-right-proxy  = update-current account-right
    change-account-index-proxy = update-current change-account-index
    build-template-line = ->
        index = velas-node-applied-template.index-of(it)
        line-style =
            padding: "10px" 
            width: \100%
            margin-bottom: \2px
            background: if index % 2 then 'rgba(255, 255, 255, 0.04)' else ''
        react.create-element 'div', { style: line-style }, ' ' + it
    line-style =
        padding: "10px" 
        width: \100%
    activate = (tab)-> ->
        store.staking.tab = tab 
    activate-line = activate \line
    activate-string = activate \string
    activate-ssh = activate \ssh 
    activate-do = activate \do
    active-class = (tab)->
        if store.staking.tab is tab then 'active' else ''
    active-line = active-class \line
    active-string = active-class \string
    active-ssh = active-class \ssh
    active-do = active-class \do
    get-balance = ->
        wallet =
            store.current.account.wallets 
                |> find -> it.coin.token is \vlx2
        wallet.balance
    get-options = (cb)->
        err, data <- web3t.velas.Staking.candidateMinStake
        return cb err if err?
        min = 
            | +store.staking.stake-amount-total >= 1000000 => 1
            | _ => data `div` (10^18)
        max = get-balance! `minus` 0.1
        return cb "You balance is less than minimum staking amount" if +min > + max
        cb null, { min, max }
    use-min = ->
        err, options <- get-options
        return alert err if err?
        store.staking.add.add-validator-stake = options.min
    use-max = ->
        err, options <- get-options
        return alert err if err?
        store.staking.add.add-validator-stake = options.max
    vote-for-change = ->
        err, can <- web3t.velas.ValidatorSet.emitInitiateChangeCallable
        return alert err if err?
        return alert "Please wait for epoch change" if can isnt yes
        data = web3t.velas.ValidatorSet.emitInitiateChange.get-data!
        to = web3t.velas.ValidatorSet.address
        amount = 0
        err <- web3t.vlx2.send-transaction { to, data, amount, gas: 4600000, gas-price: 1000000 }
        store.current.page = \staking
    your-balance = " #{round-human get-balance!} "
    your-staking-amount = store.staking.stake-amount-total `div` (10^18)
    your-staking = " #{round-human your-staking-amount}"
    vlx-token = "VLX"
    staker-status = if store.staking.is-active-staker then 'Active' else 'Inactive'
    check-uncheck = ->
        change = not store.staking.rewards.0.checked
        store.staking.rewards |> map (-> it.checked = change)
    react.create-element 'div', { className: 'staking-content' }, children = 
        #placeholder store, web3t
        react.create-element 'div', { className: 'form-group' }, children = 
            react.create-element 'div', { className: 'section' }, children = 
                react.create-element 'div', { className: 'title' }, children = 
                    react.create-element 'h3', {}, ' ' + lang.install-node
                react.create-element 'div', { className: 'description' }, children = 
                    react.create-element 'div', { className: 'left-node' }, children = 
                        react.create-element 'img', { src: "#{icons.img-node-staking}" }
                    react.create-element 'div', { className: 'right-node' }, children = 
                        react.create-element 'div', {}, ' ' + lang.txt-install-node
                        react.create-element 'br', {}
                        react.create-element 'div', {}, children = 
                            react.create-element 'span', { className: 'important' }, ' ' + lang.important + ': '
                            """ #{lang.important-dont}"""
                        if pairs.mining.keystore.length is 0
                            react.create-element 'div', {}, children = 
                                react.create-element 'div', { className: 'btn' }, children = 
                                    react.create-element 'button', { style: button-primary2-style, on-click: show-script, className: 'btn-width' }, children = 
                                        react.create-element 'span', {}, children = 
                                            react.create-element 'img', { src: "#{icons.generate}", className: 'icon-svg' }
                                            """ #{lang.generate-script}"""
                                react.create-element 'div', {}, ' ' + lang.pls-allow
                    if pairs.mining.keystore.length > 0 or window.location.href.index-of('dev') > -1
                        react.create-element 'div', {}, children = 
                            react.create-element 'div', { className: 'tabs' }, children = 
                                react.create-element 'span', { on-click: activate-line, className: "#{active-line} tab" }, ' ' + lang.line-by-line
                                react.create-element 'span', { on-click: activate-string, className: "#{active-string} tab" }, ' ' + lang.as-one
                                react.create-element 'span', { on-click: activate-ssh, className: "#{active-ssh} tab" }, ' ' + lang.install-ssh
                                react.create-element 'span', { on-click: activate-do, className: "#{active-do} tab" }, ' ' + lang.install-do
                            if active-line is \active
                                react.create-element 'div', { className: 'code' }, children = 
                                    react.create-element 'section', { className: 'window' }, children = 
                                        react.create-element 'section', { className: 'icons' }, children = 
                                            react.create-element 'span', {}
                                        react.create-element CopyToClipboard, { text: "#{velas-node-applied-template.join('\n')}", on-copy: copied-inform(store), style: filter-icon, className: 'copy' }, children = 
                                            copy store
                                    velas-node-applied-template |> map build-template-line
                            if active-string is \active
                                react.create-element 'div', { className: 'code' }, children = 
                                    react.create-element 'section', { className: 'window' }, children = 
                                        react.create-element 'section', { className: 'icons' }, children = 
                                            react.create-element 'span', {}
                                        react.create-element CopyToClipboard, { text: "#{velas-node-applied-template-line}", on-copy: copied-inform(store), style: filter-icon, className: 'copy' }, children = 
                                            copy store
                                    react.create-element 'div', { style: line-style }, children = 
                                        velas-node-applied-template-line
                            if active-ssh is \active
                                react.create-element 'div', { className: 'code' }, children = 
                                    react.create-element 'section', { className: 'window' }, children = 
                                        react.create-element 'section', { className: 'icons' }, children = 
                                            react.create-element 'span', {}
                                        react.create-element CopyToClipboard, { text: "some code", on-copy: copied-inform(store), style: filter-icon, className: 'copy' }, children = 
                                            copy store
                                    react.create-element 'div', { style: line-style }, children = 
                                        """ Coming Soon"""
                                        react.create-element 'span', { className: 'cursor' }, ' |'
                            if active-do is \active
                                react.create-element 'div', { className: 'code' }, children = 
                                    react.create-element 'section', { className: 'window' }, children = 
                                        react.create-element 'section', { className: 'icons' }, children = 
                                            react.create-element 'span', {}
                                        react.create-element CopyToClipboard, { text: "some code", on-copy: copied-inform(store), style: filter-icon, className: 'copy' }, children = 
                                            copy store
                                    react.create-element 'div', { style: line-style }, children = 
                                        """ Coming Soon"""
                                        react.create-element 'span', { className: 'cursor' }, ' |'
            if store.staking.is-active-staker is no
                react.create-element 'div', { className: 'section' }, children = 
                    react.create-element 'div', { className: 'title' }, children = 
                        react.create-element 'h3', {}, ' ' + lang.check-node
                    react.create-element 'div', { className: 'description' }, children = 
                        react.create-element 'div', { className: 'left' }, children = 
                            react.create-element 'ul', {}, children = 
                                react.create-element 'li', {}, ' 1. ' + lang.check-node1
                                react.create-element 'li', {}, ' 2. ' + lang.check-node2
                                react.create-element 'li', {}, ' 3. ' + lang.check-node3
                                react.create-element 'li', {}, ' 4. ' + lang.check-node4
            if +store.staking.stake-amount-total is 0
                react.create-element 'div', { className: 'section' }, children = 
                    react.create-element 'div', { className: 'title' }, children = 
                        react.create-element 'h3', {}, ' ' + lang.validator
                    react.create-element 'div', { className: 'description' }, children = 
                        react.create-element 'div', { className: 'left' }, children = 
                            react.create-element 'label', {}, ' ' + lang.stake
                            react.create-element 'input', { type: 'text', value: "#{round5 store.staking.add.add-validator-stake}", on-change: change-stake, style: input-style, placeholder: "#{lang.stake-placeholder}" }
                            react.create-element 'div', { className: 'balance' }, children = 
                                react.create-element 'span', { className: 'small-btns' }, children = 
                                    react.create-element 'button', { style: button-primary3-style, on-click: use-min, className: 'small' }, ' Min'
                                    react.create-element 'button', { style: button-primary3-style, on-click: use-max, className: 'small' }, ' Max'
                                react.create-element 'span', {}, ' ' + lang.your-balance + ': '
                                react.create-element 'span', { className: 'color' }, ' ' + your-balance
                                    react.create-element 'img', { src: "#{icons.vlx-icon}", className: 'label-coin' }
                                    react.create-element 'span', { className: 'color' }, ' ' + vlx-token
                        react.create-element 'button', { style: button-primary2-style, on-click: become-validator }, children = 
                            react.create-element 'span', {}, children = 
                                react.create-element 'img', { src: "#{icons.apply}", className: 'icon-svg' }
                                """ #{lang.btn-apply}"""
            if +store.staking.stake-amount-total > 0
                react.create-element 'div', { className: 'section' }, children = 
                    react.create-element 'div', { className: 'title' }, children = 
                        react.create-element 'h3', {}, ' ' + lang.your-staking
                    react.create-element 'div', { className: 'description' }, children = 
                        react.create-element 'div', { className: 'left' }, children = 
                            react.create-element 'div', { className: 'table' }, children = 
                                react.create-element 'div', { className: 'balance' }, children = 
                                    react.create-element 'span', { className: 'header' }, ' ' + lang.your-staking + ': '
                                    react.create-element 'span', { className: 'color' }, ' ' + your-staking
                                    react.create-element 'span', { className: 'color' }, ' ' + vlx-token
                                react.create-element 'div', { className: 'balance' }, children = 
                                    react.create-element 'span', { className: 'header' }, ' ' + lang.your-status + ':'
                                    react.create-element 'span', { className: 'color green' }, ' ' + staker-status
                                react.create-element 'div', { className: 'balance' }, children = 
                                    react.create-element 'span', { className: 'header' }, ' Delegators:'
                                    react.create-element 'span', { className: 'color' }, ' ' + store.staking.delegators
                                if store.staking.is-active-staker is no
                                    react.create-element 'div', { className: 'warning' }, children = 
                                        react.create-element 'ol', {}, children = 
                                            react.create-element 'li', {}, ' ' + lang.your-status1
                                            react.create-element 'li', {}, ' ' + lang.your-status2
                                react.create-element 'div', { className: 'balance' }, children = 
                                    react.create-element 'span', { className: 'header' }, ' ' + lang.current-epoch + ':'
                                    react.create-element 'span', { className: 'color' }, ' ' + store.staking.epoch
                            react.create-element 'hr', {}
                            react.create-element 'label', {}, ' ' + lang.stake-more
                            react.create-element 'input', { type: 'text', value: "#{round5 store.staking.add.add-validator-stake}", on-change: change-stake, style: input-style, placeholder: "#{lang.stake-placeholder}" }
                            react.create-element 'div', { className: 'balance' }, children = 
                                react.create-element 'span', { className: 'small-btns' }, children = 
                                    react.create-element 'button', { style: button-primary3-style, on-click: use-min, className: 'small' }, ' Min'
                                    react.create-element 'button', { style: button-primary3-style, on-click: use-max, className: 'small' }, ' Max'
                                react.create-element 'span', {}, ' Your balance: '
                                react.create-element 'span', { className: 'color' }, ' ' + your-balance
                                    react.create-element 'img', { src: "#{icons.vlx-icon}", className: 'label-coin' }
                                    react.create-element 'span', { className: 'color' }, ' ' + vlx-token
                        react.create-element 'button', { style: button-primary2-style, on-click: become-validator }, children = 
                            react.create-element 'span', {}, children = 
                                react.create-element 'img', { src: "#{icons.apply}", className: 'icon-svg' }
                                """ #{lang.btn-apply}      """
            if window.location.href.index-of('emit') > -1
                react.create-element 'div', { className: 'section' }, children = 
                    react.create-element 'div', { className: 'title' }, children = 
                        react.create-element 'h3', {}, ' ' + lang.emit-change
                    react.create-element 'div', { className: 'description' }, children = 
                        react.create-element 'div', { className: 'pad-bottom' }, ' ' + lang.propose
                        react.create-element 'button', { style: button-primary2-style, on-click: vote-for-change }, children = 
                            react.create-element 'span', {}, children = 
                                react.create-element 'img', { src: "#{icons.emit}", className: 'icon-svg' }
                                """ #{lang.emit}"""
            claim-stake store, web3t
            exit-stake store, web3t
staking = ({ store, web3t })->
    lang = get-lang store
    { go-back } = history-funcs store, web3t
    goto-search = ->
        navigate store, web3t, \search
    info = get-primary-info store
    style=
        background: info.app.wallet
        color: info.app.text
    border-style =
        color: info.app.text
        border-bottom: "1px solid #{info.app.border}"
    border-style2 =
        color: info.app.text
        border-bottom: "1px solid #{info.app.border}"
        background: "#4b2888"
    border-right =
        color: info.app.text
        border-right: "1px solid #{info.app.border}"
    button-primary2-style=
        border: "1px solid #{info.app.primary2}"
        color: info.app.text
        background: info.app.primary2
    header-table-style=
        border-bottom: "1px solid #{info.app.border}"
        background: info.app.wallet-light
    lightText=
        color: info.app.addressText
    react.create-element 'div', { className: 'staking staking1244390431' }, children = 
        react.create-element 'div', { style: border-style, className: 'title' }, children = 
            react.create-element 'div', { className: 'header' }, ' ' + lang.title-staking
            react.create-element 'div', { on-click: goto-search, className: 'close' }, children = 
                react.create-element 'img', { src: "#{icons.arrow-left}", className: 'icon-svg' }
            switch-account store, web3t
        staking-content store, web3t
staking.init = ({ store, web3t }, cb)->
    store.staking.keystore = to-keystore store, no
    store.staking.chosen-pool =
        address: store.staking.keystore.staking.address
    store.staking.reward = null
    store.staking.withdraw-amount = 0
    store.staking.stake-amount-total = 0
    #exit for now
    #return cb null
    staking-address = store.staking.keystore.staking.address
    err, amount <- web3t.velas.Staking.orderedWithdrawAmount staking-address, staking-address
    return cb err if err?
    err, last-epoch <- web3t.velas.Staking.orderWithdrawEpoch(store.staking.chosen-pool.address, staking-address)
    return cb "#{err}" if err?
    err, staking-epoch <- web3t.velas.Staking.stakingEpoch
    return cb "#{err}" if err?
    res = staking-epoch `minus` last-epoch
    store.staking.wait-for-epoch-change = if +res is 0 then yes else no
    store.staking.withdraw-amount = amount.to-fixed!
    store.staking.add.add-validator-stake = 0
    err, epoch <- web3t.velas.Staking.stakingEpoch
    store.staking.epoch = epoch.to-fixed!
    err, amount <- web3t.velas.Staking.stakeAmount(staking-address, staking-address)
    store.staking.stake-amount-total = amount.to-fixed!
    err, is-active <- web3t.velas.Staking.isPoolActive(staking-address)
    return cb err if err? 
    store.staking.is-active-staker = is-active
    err, delegators <- web3t.velas.Staking.poolDelegators(staking-address)
    return cb err if err?
    store.staking.delegators = delegators.length
    cb null
module.exports = staking
staking.focus = ({ store, web3t }, cb)->
    claim-stake.calc-reward store, web3t
    cb null
#V31V1kD7DpT9eoRcdXf7T1fbFqcNh