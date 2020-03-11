require! {
    \react
    \prelude-ls : { map }
    \../pin.ls : { set, check, exists } 
    \../navigate.ls
    \../get-primary-info.ls
    \../get-lang.ls
    \../send-form.ls : { notify-form-result }
}
# .locked-1331735696
#     @import scheme
#     padding-top: 70px
#     height: $height
#     height: 100vh
#     box-sizing: border-box
#     text-align: center
#     .password
#         -webkit-text-security: disc
#         text-security: disc
#         &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
#             -webkit-appearance: none
#         -moz-appearance: textfield
#     >.logo 
#         margin: 4rem 0
#         >img
#             height: 80px
#             margin-bottom: 1rem
#         >.title
#             font-size: 12px
#             font-weight: 600
#             letter-spacing: 4px
#             text-align: center
#     >.title
#         font-size: 22px
#         margin-bottom: 1rem
#     >.inputs
#         input
#             text-align: center
#             font-size: 17px
#             display: inline-block
#             height: 36px
#             background: transparent
#             border: 1px solid #549D90
#             border-radius: $border
#             outline: none
#             width: 100px
#             letter-spacing: 5px
#             box-sizing: border-box
#             &:focus
#                 border-color: #248295
#             &:placeholder
#                 color: $primary + 40
#     >.wrong
#         color: red
#         font-size: 12px
#         margin-top: 10px
#     button.setup
#         font-weight: bold
#         cursor: pointer
#         margin-top: 15px
#         width: 100px
#         height: 36px
#         font-size: 10px
#         text-transform: uppercase
#         padding: 0px 6px
#         border-radius: $border
#         border: 0px
#         background: transparent
#         &:hover
#             background: #248295 - 20
#         color: white
#     .hint
#         color: #f2eeee
#         padding: 20px 0
#         max-width: 250px
#         font-size: 13px
#         margin: 0 auto
#     .iron
#         -webkit-mask-image: linear-gradient(75deg, rgba(0, 0, 0, 0.6) 30%, #000 50%, rgba(0, 0, 0, 0.6) 70%)
#         -webkit-mask-size: 50%
#         animation: shine 2s infinite
#     @keyframes shine
#         0%
#             -webkit-mask-position: right
#         100%
#             -webkit-mask-position: left
#     .version
#         font-size: 10px
#         font-weight: 600
#         letter-spacing: 0px
#         text-align: center
#         opacity: .4
#         bottom: 30px
#         position: absolute
#         width: 100%
wrong-pin = (store)->
    #console.log \wrong-pin, 
    store.current.pin = ""
    store.current.pin-trial += 1
check-pin = (store, web3t)->
    <- set-timeout _, 100
    return if not exists!
    return wrong-pin store if not check(store.current.pin)
    store.current.pin-trial = 0
    store.current.pin = ""
    store.current.loading = yes
    #console.log \start
    #<- set-timeout _, 1
    navigate store, web3t, \:init
    notify-form-result \unlock, null
version = (store, web3t)->
    react.create-element 'div', { className: 'version' }, ' ' + store.version
input = (store, web3t)->
    info = get-primary-info store
    locked-style=
        color: info.app.text
        background: info.app.wallet
        border: "0"
    change = (e)->
        store.current.pin = e.target.value
        check-pin store, web3t if store.current.pin.length is 4
    react.create-element 'input', { key: "pin", style: locked-style, type: "number", value: "#{store.current.pin}", placeholder: "••••", on-change: change, pattern: "[0-9]*", input-mode: "numeric", auto-complete: "off", className: 'password' }
wrong-trials = (store)->
    return null if store.current.pin-trial is 0
    lang = get-lang store
    wrong-pin-text = "#{lang.wrong-pin-trials ? 'Wrong PIN. Trials'}: #{store.current.pin-trial}"
    react.create-element 'div', { key: "wrong-trial", className: 'wrong' }, ' ' + wrong-pin-text
setup-button = (store, web3t)->
    lang = get-lang store
    style = get-primary-info store
    setup = ->
        return alert(lang.wrong-pin-should ? 'PIN should be 4 digits') if not store.current.pin.match(/^[0-9]{4}$/)?
        set store.current.pin
        check-pin store, web3t
    text-color=
        color: style.app.text
    button-style =
        border: "1px solid #{style.app.primary3}"
        color: style.app.text2
        background: style.app.primary3
    react.create-element 'div', { key: "setup-button" }, children = 
        react.create-element 'button', { on-click: setup, style: button-style, className: 'setup' }, ' ' + lang.setup ? 'Setup'
        react.create-element 'div', { style: text-color, className: 'hint' }, ' ' + lang.pin-info ? 'Please memorize this PIN and do not provide it to third party.'
create-wallet = (store, web3t)->
    lang = get-lang store
    style = get-primary-info store
    create = ->
        next!
    text-color=
        color: style.app.text
    button-primary2-style=
        border: "1px solid #{style.app.primary2}"
        color: style.app.text
        background: style.app.primary2
    react.create-element 'div', { key: "create-wallet" }, children = 
        react.create-element 'button', { on-click: create, style: button-primary2-style, className: 'setup' }, ' ' + lang.create-wallet ? 'Create Wallet'
locked = ({ store, web3t })->
    return null if store.current.loading is yes
    lang = get-lang store
    title = 
        | not exists! => lang.setup-pin ? "Setup PIN"
        | _ => lang.enter-pin ? "Enter PIN"
    footer =
        | not exists! => setup-button
        | _ => wrong-trials
    info = get-primary-info store
    locked-style=
        color: info.app.text
        background-image: info.app.background-image
        background-size: "cover"
    logo-style =
        filter: info.app.filterLogo
    react.create-element 'div', { key: "locked", style: locked-style, className: 'locked locked-1331735696' }, children = 
        react.create-element 'div', { className: 'logo' }, children = 
            react.create-element 'img', { style: logo-style, src: "#{info.branding.logo}", className: 'iron' }
            react.create-element 'div', { className: 'title' }, ' ' + info.branding.title
        react.create-element 'div', { key: "locked-title", className: 'title' }, ' ' + title
        react.create-element 'div', { key: "locked-inputs", className: 'inputs' }, children = 
            input store, web3t
        footer store, web3t
        version store, web3t
focus = ({ store }, cb)->
    cb null
locked.focus = focus
module.exports = locked