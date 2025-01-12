// Generated by LiveScript 1.6.0
(function(){
  var react, getPrimaryInfo, round5, round, find, times, keyboard, icons;
  react = require('react');
  getPrimaryInfo = require('../get-primary-info.js');
  round5 = require('../round5.js');
  round = require('../round.js');
  find = require('prelude-ls').find;
  times = require('../math.js').times;
  keyboard = require('./keyboard.js');
  icons = require('../icons.js');
  module.exports = function(arg$){
    var ref, store, value, onChange, placeholder, type, onKeyDown, id, style, inputStyle, btnIcon, actualPlaceholder, chosenType, children;
    ref = arg$.ref, store = arg$.store, value = arg$.value, onChange = arg$.onChange, placeholder = arg$.placeholder, type = arg$.type, onKeyDown = arg$.onKeyDown, id = arg$.id;
    style = getPrimaryInfo(store);
    inputStyle = {
      background: style.app.input,
      color: style.app.text,
      overflowX: 'auto',
      marginBottom: '5px'
    };
    btnIcon = {
      filter: style.app.btnIcon
    };
    actualPlaceholder = placeholder != null ? placeholder : "";
    chosenType = (function(){
      switch (false) {
      case type !== 'password':
        return 'password';
      default:
        return 'text';
      }
    }());
    return react.createElement('div', {
      className: 'input-area input-area-1968452910'
    }, children = [
      react.createElement('input', {
        ref: ref,
        'void': void 8,
        type: chosenType + "",
        value: value + "",
        style: inputStyle,
        onChange: onChange,
        placeholder: actualPlaceholder,
        autoComplete: "off",
        onKeyDown: onKeyDown,
        id: id
      }), store.current.device !== 'mobile' ? react.createElement('span', {
        className: 'keyboard-panel'
      }, children = [
        react.createElement('img', {
          src: icons.keyboard + "",
          className: 'icon-svg'
        }), react.createElement('div', {
          style: inputStyle,
          className: 'show-details'
        }, children = react.createElement('div', {
          className: 'panel'
        }, children = keyboard({
          store: store,
          onChange: onChange != null ? onChange : onChange,
          value: value
        })))
      ]) : void 8
    ]);
  };
}).call(this);
