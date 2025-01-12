// Generated by LiveScript 1.6.0
(function(){
  var react, newseedFuncs, getLang, getPrimaryInfo, icon, icons, ref$, map, each, sortBy, newseed, focus;
  react = require('react');
  newseedFuncs = require('../newseed-funcs.js');
  getLang = require('../get-lang.js');
  getPrimaryInfo = require('../get-primary-info.js');
  icon = require('./icon.js');
  icons = require('../icons.js');
  ref$ = require('prelude-ls'), map = ref$.map, each = ref$.each, sortBy = ref$.sortBy;
  newseed = function(arg$){
    var store, web3t, lang, style, ref$, generateSeed, next, textStyle, btnIcon, addressInput, buttonPrimary1Style, buttonPrimary2Style, buttonPrimary3Style, logoStyle, expandCollapse, langsMenuBody, commingSoon, newWallet, random, restoreWallet, restore12, restore24, restorecustom, back, children;
    store = arg$.store, web3t = arg$.web3t;
    lang = getLang(store);
    style = getPrimaryInfo(store);
    ref$ = newseedFuncs(store, web3t), generateSeed = ref$.generateSeed, next = ref$.next;
    textStyle = {
      color: style.app.text
    };
    btnIcon = {
      filter: style.app.btnIcon
    };
    addressInput = {
      color: style.app.text,
      background: style.app.wallet
    };
    buttonPrimary1Style = {
      border: "0",
      color: style.app.text,
      background: style.app.primary1,
      backgroundColor: style.app.primary1Spare
    };
    buttonPrimary2Style = {
      border: "1px solid " + style.app.primary2,
      color: style.app.text,
      background: style.app.primary2,
      backgroundColor: style.app.primary2Spare
    };
    buttonPrimary3Style = {
      border: "0",
      color: style.app.text2,
      background: style.app.primary3,
      backgroundColor: style.app.primary3Spare
    };
    logoStyle = {
      filter: style.app.filterLogo
    };
    expandCollapse = function(){
      return store.current.langsOpenStart = !store.current.langsOpenStart;
    };
    langsMenuBody = {
      border: "1px solid " + style.app.border,
      background: style.app.header
    };
    textStyle = {
      color: style.app.text
    };
    commingSoon = {
      opacity: ".3",
      cursor: "no-drop",
      border: "1px solid " + style.app.primary3,
      color: style.app.text2,
      background: style.app.primary3,
      backgroundColor: style.app.primary3Spare
    };
    newWallet = function(){
      generateSeed();
      return next();
    };
    random = function(){
      return Math.random();
    };
    restoreWallet = function(count){
      return function(){
        var sorted, mapIndex;
        store.current.seedWords = map(function(){
          return {
            part: "",
            index: 0
          };
        })(
        (function(){
          var i$, to$, results$ = [];
          for (i$ = 1, to$ = count; i$ <= to$; ++i$) {
            results$.push(i$);
          }
          return results$;
        }()));
        store.current.seedGenerated = false;
        sorted = sortBy(random)(
        store.current.seedWords);
        mapIndex = function(it){
          return it.index = sorted.indexOf(it);
        };
        each(mapIndex)(
        store.current.seedWords);
        return next();
      };
    };
    restore12 = restoreWallet(12);
    restore24 = restoreWallet(24);
    restorecustom = restoreWallet(1);
    back = function(){
      return store.current.page = 'chooseinit';
    };
    return react.createElement('div', {
      className: 'newseed-restore newseed-restore-873991282'
    }, children = [
      react.createElement('div', {
        className: 'logo'
      }, children = [
        react.createElement('img', {
          src: style.branding.logo + ""
        }), react.createElement('div', {
          style: textStyle,
          className: 'title'
        }, ' ' + style.branding.title)
      ]), react.createElement('div', {
        style: textStyle,
        className: 'welcome'
      }, ' ' + lang.restoreFrom), react.createElement('div', {
        className: 'align-v'
      }, children = [
        react.createElement('button', {
          style: buttonPrimary1Style,
          onClick: restore12,
          id: "restore-12",
          className: 'left'
        }, children = react.createElement('span', {}, children = [
          react.createElement('img', {
            src: icons.restore + "",
            className: 'icon-svg'
          }), " 12 " + lang.restoreWords12
        ])), react.createElement('button', {
          style: buttonPrimary1Style,
          onClick: restore24,
          id: "restore-24",
          className: 'right'
        }, children = react.createElement('span', {}, children = [
          react.createElement('img', {
            src: icons.restore + "",
            className: 'icon-svg'
          }), " 24 " + lang.restoreWords24
        ])), react.createElement('button', {
          style: buttonPrimary1Style,
          onClick: restorecustom,
          id: "restore-custom",
          className: 'right'
        }, children = react.createElement('span', {}, children = [
          react.createElement('img', {
            src: icons.restore + "",
            className: 'icon-svg'
          }), " Custom"
        ])), react.createElement('button', {
          onClick: back,
          style: buttonPrimary3Style,
          id: "restore-back",
          className: 'right'
        }, children = [
          react.createElement('img', {
            src: icons.arrowLeft + "",
            style: btnIcon,
            className: 'icon-svg'
          }), " " + lang.back
        ])
      ])
    ]);
  };
  focus = function(arg$, cb){
    var store;
    store = arg$.store;
    return setTimeout(function(){
      return cb(null);
    }, 1000);
  };
  newseed.focus = focus;
  module.exports = newseed;
}).call(this);
