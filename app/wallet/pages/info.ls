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
    \./switch-account.ls
    \../icons.ls
    \./choosestaker.ls
    \./staker-stats.ls
    \./staker-stats2.ls
    \./staker-stats3.ls
    \prelude-ls : { map, foldl }
    \../math.ls : { plus, div }
    \../round-human.ls
}
# .info-2054257772
#     @import scheme
#     color: white
#     $border-radius: $border
#     $smooth: opacity .15s ease-in-out
#     position: relative
#     display: block
#     width: auto
#     overflow: hidden
#     margin-left: 60px
#     top: 0
#     height: 100%
#     min-height: 100vh
#     padding-top: 5%
#     box-sizing: border-box
#     padding: 0px
#     background: transparent
#     @media(max-width:800px)
#         width: 100%
#         margin: 0
#     button
#         background-color: $primary
#         border: 1px solid $primary
#         border-radius: $border
#         color: white
#         height: 36px
#         width: 104px
#         margin-top: 5px
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
#         &:hover
#             background: transparent
#             color: $primary
#         &.link
#             min-width: 190px
#         float: right
#         margin-top: 12px
#         margin-right: 10px
#     >.title
#         position: sticky
#         position: -webkit-sticky
#         background: linear-gradient(100deg, #331462 4%, #15063c 100%)
#         box-sizing: border-box
#         top: 0
#         width: 100%
#         color: gray
#         font-size: 22px
#         padding: 10px
#         height: 60px
#         z-index: 2
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
#     >.wrapper
#         max-height: calc(100vh - 100px)
#         display: block
#         overflow-y: scroll
#         scrollbar-width: none
#         padding: 20px
#         margin-top: 0
#         display: flex
#         flex-wrap: wrap
#         margin-right: -10px
#         margin-left: -10px
#         .col
#             box-sizing: border-box
#             padding: 0 10px
#             margin-bottom: 20px
#             >div
#                 background: #3b1771
#                 padding: 30px 20px
#             &.col-4
#                 -webkit-box-flex: 0
#                 flex: 0 0 25%
#                 max-width: 25%
#                 @media screen and (max-width: 800px)
#                     -webkit-box-flex: 0
#                     flex: 0 0 50%
#                     max-width: 50%
#             &.col-6
#                 -webkit-box-flex: 0
#                 flex: 0 0 50%
#                 max-width: 50%
#                 @media screen and (max-width: 800px)
#                     -webkit-box-flex: 0
#                     flex: 0 0 100%
#                     max-width: 100%
#             canvas
#                 height: auto !important
#                 width: 80% !important
#                 margin: 30px auto 0
#                 @media screen and (max-width: 800px)
#                     width: 100% !important
#                     height: auto !important
#             .value
#                 font-size: 20px
#                 display: inline-flex
#                 .symbol
#                     font-size: 14px
#                     vertical-align: super
#             .header
#                 font-size: 12px
#                 text-transform: uppercase
#                 letter-spacing: 2px
#                 opacity: .8
#                 font-weight: 400
total-pool = (store, web3t)->
    react.create-element 'div', { className: 'col col-4' }, children = 
        react.create-element 'div', {}, children = 
            react.create-element 'div', { className: 'value' }, children = 
                react.create-element 'div', { className: 'symbol' }
                react.create-element 'div', { title: '', className: 'number' }, ' ' + store.staking.pools.length
            react.create-element 'div', { className: 'header' }, ' Total Pools'
total-stakers  = (store, web3t)->
    stakers =
        store.staking.pools |> map (.stakers) |> foldl plus, 0
    react.create-element 'div', { className: 'col col-4' }, children = 
        react.create-element 'div', {}, children = 
            react.create-element 'div', { className: 'value' }, children = 
                react.create-element 'div', { className: 'symbol' }
                react.create-element 'div', { title: '', className: 'number' }, ' ' + stakers
            react.create-element 'div', { className: 'header' }, ' Total Stakers'
staking-amount = (store, web3t)->
    amount =
        store.staking.pools |> map (.stake) |> foldl plus, 0
    react.create-element 'div', { className: 'col col-4' }, children = 
        react.create-element 'div', {}, children = 
            react.create-element 'div', { className: 'value' }, children = 
                react.create-element 'div', { className: 'symbol' }
                react.create-element 'div', { title: '', className: 'number' }, ' ' + round-human(amount)
            react.create-element 'div', { className: 'header' }, ' Total Staking'
my-stake = (store, web3t)->
    amount =
        store.staking.pools |> map (.my-stake) |> foldl plus, 0
    react.create-element 'div', { className: 'col col-4' }, children = 
        react.create-element 'div', {}, children = 
            react.create-element 'div', { className: 'value' }, children = 
                react.create-element 'div', { className: 'symbol' }
                react.create-element 'div', { title: '', className: 'number' }, ' ' + round-human(amount)
            react.create-element 'div', { className: 'header' }, ' Total My Stake'
chart-amount-sizes = (store, web3t)->
    react.create-element 'div', { className: 'col-6 col' }, children = 
        react.create-element 'div', {}, children = 
            react.create-element 'div', { className: 'header' }, ' Pool stake sizes'
            staker-stats store, web3t
chart-stakers-counts = (store, web3t)->
    react.create-element 'div', { className: 'col-6 col' }, children = 
        react.create-element 'div', {}, children = 
            react.create-element 'div', { className: 'header' }, ' Pool Population'
            staker-stats2 store, web3t
info = ({ store, web3t })->
    lang = get-lang store
    { go-back } = history-funcs store, web3t
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
    border-style3 =
        color: info.app.text
        border-bottom: "0"
    border-right =
        color: info.app.text
        border-right: "1px solid #{info.app.border}"
    button-primary2-style=
        border: "1px solid #{info.app.primary2}"
        color: info.app.text
        background: info.app.primary2
    filter-body =
        border: "1px solid #{info.app.border}"
        background: info.app.header
    button-primary1-style=
        border: "1px solid #{info.app.primary1}"
        color: info.app.text
        background: info.app.primary1
    lightText=
        color: info.app.addressText
    icon-style=
        filter: info.app.nothingIcon
    react.create-element 'div', { className: 'info info-2054257772' }, children = 
        react.create-element 'div', { style: border-style, className: 'title' }, children = 
            react.create-element 'div', { className: 'header' }, ' Info page'
            react.create-element 'div', { on-click: go-back, className: 'close' }, children = 
                react.create-element 'img', { src: "#{icons.arrow-left}", className: 'icon-svg' }
            switch-account store, web3t
        react.create-element 'div', { className: 'wrapper' }, children = 
            total-pool store, web3t
            total-stakers store, web3t
            staking-amount store, web3t
            my-stake store, web3t
            chart-amount-sizes store, web3t
            chart-stakers-counts store, web3t
            staker-stats3 store, web3t
module.exports = info
feel-reward = ({ store, web3t, epoch }, [pool, ...pools], cb)->
    return cb null, [] if not pool?
    err, reward-number <- web3t.velas.BlockReward.epochPoolNativeReward(epoch, pool.mining-address)
    #console.log \epochPoolNativeReward,  epoch, pool.address, err, reward.to-fixed!
    return cb err if err?
    <- set-immediate
    err, rest <- feel-reward { store, web3t, epoch }, pools
    return cb err if err?
    reward = reward-number `div` (10^18)
    item = { pool.address, epoch, reward }
    all = [item] ++ rest
    cb null, all
feel-rewards = ({ store, web3t }, [epoch, ...epochs], cb)->
    err, data <- feel-reward { store, web3t, epoch }, store.staking.pools
    return cb err if err?
    err, rest <- feel-rewards { store, web3t }, epochs
    return cb err if err?
    all = [data] ++ rest
    cb null, all
module.exports.init = ({ store, web3t }, cb)->
    err, data <- choosestaker.init { store, web3t }
    cb null
module.exports.focus = ({ store, web3t}, cb)->
    err <- choosestaker.focus { store, web3t }
    return cb err if err?
    #err, epoch <- web3t.velas.Staking.stakingEpoch
    #return cb err if err?
    #epoch-reward = 20
    #err, data <- feel-rewards { store, web3t }, [epoch-reward]
    #return cb err if err?
    #store.staking.reward-info = data
    cb null