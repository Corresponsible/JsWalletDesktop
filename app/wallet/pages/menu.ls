require! {
    \react
    \../tools.ls : { cut, money }
    \./project-links.ls
    \../menu-funcs.ls
    \./your-account.ls
    \../get-primary-info.ls
    \../get-lang.ls
    \./icon.ls
    \./header.ls
}
# .menu28540061
#     padding: 0 5px
#     height: 199px
#     line-height: 200px
#     .syncing
#         @keyframes spin
#             from
#                 transform: rotate(0deg)
#             to 
#                 transform: rotate(360deg)
#         animation-name: spin
#         animation-duration: 4000ms
#         animation-iteration-count: infinite
#         animation-timing-function: linear
#     .loader
#         display: inline-block
#         cursor: pointer
#         svg
#             vertical-align: sub !important
#             width: 12px
#     >.menu-body
#         display: inline-block
#         line-height: normal
#         vertical-align: middle
#         vertical-align: -webkit-baseline-middle
#         width: 100%
#         max-width: 450px
#         >.balance
#             position: relative
#             >.menu
#                 position: absolute
#                 right: 0
#                 top: 0
#                 >.menu-item
#                     display: block
#                     &.syncing
#                         @keyframes spin
#                             from
#                                 transform: rotate(0deg)
#                             to 
#                                 transform: rotate(360deg)
#                         animation-name: spin
#                         animation-duration: 4000ms
#                         animation-iteration-count: infinite
#                         animation-timing-function: linear
#                     cursor: pointer
#                     opacity: 0.9
#                     &:hover
#                         opacity: 1
#                     vertical-align: top
#                     line-height: normal
#                     display: inline-block
#                     margin-left: 15px
#             text-align: center
#             >.currency
#             >.amount
#                 font-size: 40px
#                 >*
#                     display: inline-block
#     .placeholder
#         width: auto !important
#         height: 34px !important
#         line-height: 34px !important
#         -webkit-animation-duration: 1s
#         animation-duration: 1s
#         -webkit-animation-fill-mode: forwards
#         animation-fill-mode: forwards
#         -webkit-animation-iteration-count: infinite
#         animation-iteration-count: infinite
#         -webkit-animation-name: placeload
#         animation-name: placeload
#         -webkit-animation-timing-function: linear
#         animation-timing-function: linear
#         background: #f6f7f8
#         background: #eeeeee
#         background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee))
#         background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%)
#         background: linear-gradient(to right, #2c1059 8%, #2b1058 18%, #2e115b 33%)
#         -webkit-background-size: 800px 104px
#         background-size: 1200px 104px
#         position: relative
#         color: transparent
#         width: 100%
#         display: inline-block
#         height: 16px
#     @-webkit-keyframes placeload
#         0%
#             background-position: -468px 0
#         100%
#             background-position: 468px 0
#     @keyframes placeload
#         0%
#             background-position: -468px 0
#         100%
#             background-position: 468px 0
module.exports = ({ store, web3t })->
    return null if not store?
    { current, open-account, lock, wallet-style, info, activate-s1, activate-s2, activate-s3, switch-network, refresh, lock } = menu-funcs store, web3t
    style = get-primary-info store
    menu-style=
        color: style.app.text
    icon-style =
        color: style.app.icon
    lang = get-lang store
    syncing = 
        | store.current.refreshing => \syncing
        | _ => ""
    placeholder = 
        | store.current.refreshing => "placeholder"
        | _ => ""
    react.create-element 'div', { style: menu-style, className: 'menu menu28540061' }, children = 
        react.create-element 'div', { className: 'menu-body' }, children = 
            react.create-element 'div', { className: 'balance' }, children = 
                react.create-element 'div', {}, children = 
                    if store.preference.refresh-visible is yes
                        react.create-element 'div', { on-click: refresh, style: icon-style, className: "#{syncing} menu-item loader" }, children = 
                            icon \Sync, 20
                react.create-element 'div', { className: "#{placeholder} amount" }, children = 
                    react.create-element 'div', { className: 'symbol' }, ' $'
                    react.create-element 'div', { className: 'number' }, ' ' + money current.balance-usd
                react.create-element 'div', { className: 'currency' }, ' ' + lang.total-balance ? 'Total Balance'
            if store.current.device is \mobile    
                your-account store, web3t
            project-links { store, web3t }