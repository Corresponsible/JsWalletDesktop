// Generated by LiveScript 1.6.0
(function(){
  var react, getPrimaryInfo, getLang, epoch, alertDemo, burger, switchAccount, icons, historyFuncs, AddressUtil, convert;
  react = require('react');
  getPrimaryInfo = require('../get-primary-info.js');
  getLang = require('../get-lang.js');
  epoch = require('./epoch.js');
  alertDemo = require('./alert-demo.js');
  burger = require('../components/burger.js');
  switchAccount = require('./switch-account.js');
  icons = require('../icons.js');
  historyFuncs = require('../history-funcs.js');
  AddressUtil = function(props){
    var style, ref$, vlxAddress, vlxAddressChange, ethAddress, ethAddressChange, vlxAddressOnhange, ethAddressOnhange, children;
    style = getPrimaryInfo(store);
    style = {
      border: "1px solid " + style.app.border,
      background: style.app.input,
      color: style.app.text
    };
    ref$ = react.useState(""), vlxAddress = ref$[0], vlxAddressChange = ref$[1];
    ref$ = react.useState(""), ethAddress = ref$[0], ethAddressChange = ref$[1];
    vlxAddressOnhange = function(event){
      var address, e;
      vlxAddressChange(event.target.value);
      try {
        address = toEthAddress(event.target.value);
        return ethAddressChange(address || "");
      } catch (e$) {
        e = e$;
        return ethAddressChange(e.message);
      }
    };
    ethAddressOnhange = function(event){
      var address, e;
      ethAddressChange(event.target.value);
      try {
        address = toVelasAddress(event.target.value);
        return vlxAddressChange(address || "");
      } catch (e$) {
        e = e$;
        return vlxAddressChange(e.message);
      }
    };
    return react.createElement('div', {}, children = [
      react.createElement('div', {
        className: 'form-group'
      }, children = [
        react.createElement('label', {}, ' Please paste your VLX address here.'), react.createElement('input', {
          style: style,
          placeholder: "VLX address",
          onChange: vlxAddressOnhange,
          value: vlxAddress
        })
      ]), react.createElement('div', {
        className: 'form-group'
      }, children = [
        react.createElement('label', {}, ' Please paste your ETH address here.'), react.createElement('input', {
          style: style,
          placeholder: "ETH address",
          onChange: ethAddressOnhange,
          value: ethAddress
        })
      ])
    ]);
  };
  convert = function(arg$){
    var store, web3t, lang, goBack, style, text, borderStyle, showClass, children;
    store = arg$.store, web3t = arg$.web3t;
    lang = getLang(store);
    goBack = historyFuncs(store, web3t).goBack;
    style = getPrimaryInfo(store);
    text = {
      color: style.app.text
    };
    borderStyle = {
      color: style.app.text,
      borderBottom: "1px solid " + style.app.border,
      background: style.app.background,
      backgroundColor: style.app.bgspare
    };
    showClass = store.current.openMenu ? 'hide' : "";
    return react.createElement('div', {
      className: 'convert convert179103145'
    }, children = [
      alertDemo(store, web3t), react.createElement('div', {
        style: borderStyle,
        className: 'title'
      }, children = [
        react.createElement('div', {
          className: showClass + " header"
        }, ' Convert'), react.createElement('div', {
          onClick: goBack,
          className: 'close'
        }, children = react.createElement('img', {
          src: icons.arrowLeft + "",
          className: 'icon-svg'
        })), burger(store, web3t), epoch(store, web3t), switchAccount(store, web3t)
      ]), react.createElement('div', {
        className: 'wrapper'
      }, children = [
        react.createElement('div', {
          className: 'sub-header'
        }, children = react.createElement('span', {
          style: text,
          className: 'head'
        }, ' Convert VLX2ETH')), react.createElement(AddressUtil, {})
      ])
    ]);
  };
  module.exports = convert;
}).call(this);
