require! {
    \react
    \../get-primary-info.ls
    \../round5.ls
    \../round.ls
    \prelude-ls : { find }
    \../math.ls : { times }
    \./keyboard.ls
    \../icons.ls
}
# .input-area-1968452910
#     position: relative
#     margin: 10px 0
#     width: 100%
#     box-sizing: border-box
#     height: 36px
#     line-height: 36px
#     >*
#         display: inline-block
#         box-sizing: border-box
#         margin: 0 !important
#         height: inherit
#         line-height: inherit
#         vertical-align: top
#     >input
#         display: inline-block
#         width: calc(100% - 70px)
#         padding: 0 10px
#     >.keyboard-panel
#         >.show-details
#             position: absolute
#             display: none
#             top: 25px
#             left: 0px
#             z-index: 9999
#             width: 400px
#             box-shadow: 1px 2px 3px black;
#         &:hover
#             >.show-details
#                 display: inline-block
#         >.icon-svg
#             position: absolute
#             right: 8px
#             top: 13px
module.exports = ({ ref, store, value, on-change, placeholder, type, on-key-down, id })->
    style = get-primary-info store
    input-style =
        background: style.app.input
        color: style.app.text
        overflow-x: \auto
        margin-bottom: \5px
    btn-icon =
        filter: style.app.btn-icon
    actual-placeholder = placeholder ? ""
    chosen-type =
        | type is \password => \password
        | _ => \text
    react.create-element 'div', { className: 'input-area input-area-1968452910' }, children = 
        react.create-element 'input', { ref: ref,, type: "#{chosen-type}", value: "#{value}", style: input-style, on-change: on-change, placeholder: actual-placeholder, auto-complete: "off", on-key-down: on-key-down, id: id }
        if store.current.device isnt \mobile
            react.create-element 'span', { className: 'keyboard-panel' }, children = 
                react.create-element 'img', { src: "#{icons.keyboard}", className: 'icon-svg' }
                react.create-element 'div', { style: input-style, className: 'show-details' }, children = 
                    react.create-element 'div', { className: 'panel' }, children = 
                        keyboard { store , on-change=on-change, value }