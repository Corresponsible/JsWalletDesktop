require! {
    \react
    \../tools.ls : { cut, money }
    \./project-links.ls
    \../menu-funcs.ls
    \./your-account.ls
    \../get-primary-info.ls
    \../get-lang.ls
    \./icon.ls
    \../icons.ls
    \./header.ls
    \../navigate.ls
    \../round-human.ls
    \../add-coin.ls
    \./tor.ls
}
# .menu369227581
#     height: 199px
#     line-height: 200px
#     $mobile: 425px
#     $tablet: 800px
#     .icon-svg-plus
#         position: relative
#         height: 16px
#         top: 2px
#         padding: 0
#         cursor: pointer
#         vertical-align: top
#     &.wallet-main
#         @media(max-width: 800px)
#             margin: 0px 15px 0
#             position: relative
#             left: 0
#             right: 0
#         @media(max-width: $mobile)
#             margin: 0
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
#         color: #00ffdc
#         svg
#             width: 25px
#         .icon-svg
#             vertical-align: sub !important
#             width: 20px
#     >.menu-body
#         display: inline-block
#         line-height: normal
#         vertical-align: middle
#         vertical-align: -webkit-baseline-middle
#         width: 100%
#         max-width: 450px
#         >.branding
#             margin-top: 35px
#             text-align: center
#             img
#                 width: 35px
#                 cursor: pointer
#         >.balance
#             position: relative
#             button
#                 svg
#                     width: 20px
#                     cursor: pointer
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
#                 &.h1
#                     font-size: 12px
#                     text-transform: uppercase
#                     letter-spacing: 2px
#                     line-height: 24px
#                     opacity: .8
#                     margin-top: 5px
#             >.amount
#                 font-size: 25px
#                 font-weight: bold
#                 .symbol
#                     font-size: 15px
#                     vertical-align: unset
#                     opacity: .5
#                     margin-right: 2px
#                 >*
#                     display: inline-block
#     .placeholder
#         width: auto !important
#         height: 34px !important
#         line-height: 34px !important
#         -webkit-mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, #000000 50%, rgba(255, 255, 255, 0.6) 70%)
#         -webkit-mask-size: 50%
#         animation: fb 1s infinite
#         animation-fill-mode: forwards
#         background: var(--placeholder-menu)
#         color: transparent !important
#         width: 100%
#         display: inline-block
#         height: 16px
#     @keyframes fb
#         0%
#             -webkit-mask-position: left
#         100%
#             -webkit-mask-position: right
module.exports = ({ store, web3t })->
    return null if not store?
    { current, open-account, lock, wallet-style, info, activate-s1, activate-s2, activate-s3, switch-network, refresh, lock } = menu-funcs store, web3t
    style = get-primary-info store
    menu-style=
        color: style.app.text
    icon-style =
        color: style.app.loader
        margin-top: "10px"
    goto-wallet = ->
        navigate store, web3t, \wallets
    button-add=
        color: style.app.text
        border-radius: "50px"
        border: "0"
        background: style.app.bg-btn
        line-height: "25px"
        padding: "10px"
        width: "40px"
        height: "40px"
        margin: "10px 5px 0"
    button-syncing=
        color: style.app.loader
        border-radius: "50px"
        border: "0"
        background: style.app.bg-btn
        line-height: "25px"
        padding: "10px"
        width: "40px"
        height: "40px"
        margin: "0px 5px 0"
    logo-style =
        filter: style.app.filterLogo
    lang = get-lang store
    syncing =
        | store.current.refreshing => \syncing
        | _ => ""
    placeholder =
        | store.current.refreshing => "placeholder"
        | _ => ""
    react.create-element 'div', { style: menu-style, className: 'menu wallet-main menu369227581' }, children = 
        react.create-element 'div', { className: 'menu-body' }, children = 
            react.create-element 'div', { className: 'branding' }, children = 
                react.create-element 'img', { src: "#{info.branding.logo-sm}", on-click: goto-wallet }
            react.create-element 'div', { className: 'balance' }, children = 
                react.create-element 'div', { className: 'currency h1' }, ' ' + lang.balance
                react.create-element 'div', { className: "#{placeholder} amount" }, children = 
                    react.create-element 'div', { className: 'symbol' }, ' $'
                    react.create-element 'div', { title: "#{current.balance-usd}", id: 'balance-total', className: 'number' }, ' ' + round-human current.balance-usd
                react.create-element 'div', {}, children = 
                    if store.current.device is \desktop
                        if store.preference.refresh-visible is yes
                            react.create-element 'button', { on-click: refresh, style: button-syncing, className: "#{syncing} button lock mt-5" }, children = 
                                icon \Sync, 20
                    if no
                        if store.current.device is \desktop
                            react.create-element 'button', { on-click: add-coin(store), style: button-add, className: 'button lock mt-5' }, children = 
                                react.create-element 'img', { src: "#{icons.create}", className: 'icon-svg-plus' }
                    if store.current.device is \desktop
                        tor store, web3t
            if store.current.device is \mobile
                your-account store, web3t
            project-links { store, web3t }