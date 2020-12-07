// Generated by LiveScript 1.6.0
(function(){
  var react, qrcode, getPrimaryInfo;
  react = require('react');
  qrcode = require('../components/qrcode.ls');
  getPrimaryInfo = require('../get-primary-info.ls');
  module.exports = function(arg$){
    var store, style, copyStyle, children;
    store = arg$.store;
    if (store.current.tryCopy == null) {
      return null;
    }
    style = getPrimaryInfo(store);
    copyStyle = {
      color: style.app.text,
      background: "rgb(255 255 255 / 10%)",
      backdropFilter: "blur(5px)",
      border: "1px solid " + style.app.border
    };
    return react.createElement('div', {
      style: copyStyle,
      className: 'hovered-address hovered-address-113041651'
    }, children = [
      react.createElement('div', {
        className: 'text'
      }, ' ' + store.current.tryCopy), qrcode({
        store: store,
        address: store.current.tryCopy
      })
    ]);
  };
}).call(this);