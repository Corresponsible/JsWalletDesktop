// Generated by LiveScript 1.6.0
(function(){
  var react, QRCode, getPrimaryInfo, getLang, qrcode;
  react = require('react');
  QRCode = require('qrcode.react');
  getPrimaryInfo = require('../get-primary-info.js');
  getLang = require('../get-lang.js');
  qrcode = function(store, wallet){
    var info, bgColor, fgColor;
    info = getPrimaryInfo(store);
    if ((wallet != null ? wallet.address : void 8) == null) {
      return null;
    }
    bgColor = info.background;
    fgColor = '#0b0c27';
    return react.createElement(QRCode, {
      value: wallet.address + "",
      size: "256",
      bgColor: bgColor,
      fgColor: fgColor
    });
  };
  module.exports = function(store, wallet){
    var children;
    return react.createElement('div', {
      className: 'receive receive173047909'
    }, children = react.createElement('div', {
      className: 'receive-body'
    }, children = qrcode(store, wallet)));
  };
}).call(this);
