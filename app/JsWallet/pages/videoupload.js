// Generated by LiveScript 1.6.0
(function(){
  var react, getPrimaryInfo, getLang, icon, navigate, icons, upload, preview, videoUpload;
  react = require('react');
  getPrimaryInfo = require('../get-primary-info.js');
  getLang = require('../get-lang.js');
  icon = require('./icon.js');
  navigate = require('../navigate.js');
  icons = require('../icons.js');
  upload = function(store, web3t){
    var style, lang, inputStyle, color, buttonPrimary2Style, buttonPrimary3Style, buttonPrimary4Style, children;
    style = getPrimaryInfo(store);
    lang = getLang(store);
    inputStyle = {
      background: style.app.wallet,
      border: "0",
      color: style.app.text
    };
    color = {
      color: style.app.text
    };
    buttonPrimary2Style = {
      border: "1px solid " + style.app.primary2,
      color: style.app.text,
      background: style.app.primary2,
      backgroundColor: style.app.primary2Spare
    };
    buttonPrimary3Style = {
      border: "1px solid " + style.app.border,
      color: style.app.text2,
      background: style.app.primary3,
      backgroundColor: style.app.primary3Spare
    };
    buttonPrimary4Style = {
      border: "1px solid " + style.app.border,
      color: style.app.text,
      background: 'rgb(195, 92, 95)'
    };
    return react.createElement('div', {}, children = [
      react.createElement('div', {
        className: 'content-upload'
      }, children = [" This script automatically deploys your node through the terminal.", " This script automatically deploys your node through the terminal."]), react.createElement('input', {
        type: "text",
        placeholder: "link",
        style: inputStyle
      }), react.createElement('div', {
        className: 'btn-area'
      }, children = react.createElement('button', {
        style: buttonPrimary2Style
      }, children = react.createElement('span', {}, children = [
        react.createElement('img', {
          src: icons.apply + "",
          className: 'icon-svg'
        }), " Upload"
      ])))
    ]);
  };
  preview = function(store, web3t){
    var style, lang, inputStyle, color, buttonPrimary2Style, buttonPrimary3Style, buttonPrimary4Style, children;
    style = getPrimaryInfo(store);
    lang = getLang(store);
    inputStyle = {
      background: style.app.wallet,
      border: "0",
      color: style.app.text
    };
    color = {
      color: style.app.text
    };
    buttonPrimary2Style = {
      border: "1px solid " + style.app.primary2,
      color: style.app.text,
      background: style.app.primary2,
      backgroundColor: style.app.primary2Spare
    };
    buttonPrimary3Style = {
      border: "1px solid " + style.app.border,
      color: style.app.text2,
      background: style.app.primary3,
      backgroundColor: style.app.primary3Spare
    };
    buttonPrimary4Style = {
      border: "1px solid " + style.app.border,
      color: style.app.text,
      background: 'rgb(195, 92, 95)'
    };
    return react.createElement('div', {}, children = [
      react.createElement('div', {
        className: 'content-upload'
      }, children = [" Do not transfer this script to anyone, as it is generated in your wallet, using personal wallet data.", " Do not transfer this script to anyone, as it is generated."]), react.createElement('input', {
        type: "text",
        placeholder: "link",
        style: inputStyle
      }), react.createElement('div', {
        className: 'btn-area'
      }, children = react.createElement('button', {
        style: buttonPrimary2Style
      }, children = react.createElement('span', {}, children = [
        react.createElement('img', {
          src: icons.apply + "",
          className: 'icon-svg'
        }), " Preview"
      ])))
    ]);
  };
  videoUpload = function(store, web3t){
    var style, iconStyle, lang, activate, activateUpload, activatePreview, activeClass, activeUpload, activePreview, children;
    style = getPrimaryInfo(store);
    iconStyle = {
      filter: style.app.nothingIcon
    };
    lang = getLang(store);
    activate = function(step){
      return function(){
        return store.video.action = step;
      };
    };
    activateUpload = activate('upload');
    activatePreview = activate('preview');
    activeClass = function(step){
      if (store.video.action === step) {
        return 'active';
      } else {
        return '';
      }
    };
    activeUpload = activeClass('upload');
    activePreview = activeClass('preview');
    return react.createElement('div', {}, children = [
      react.createElement('ul', {
        className: 'tab'
      }, children = [
        react.createElement('li', {
          onClick: activateUpload,
          className: activeUpload + ""
        }, ' Upload'), react.createElement('li', {
          onClick: activatePreview,
          className: activePreview + ""
        }, ' Preview')
      ]), react.createElement('div', {
        className: 'header'
      }, children = [
        react.createElement('img', {
          src: icons.imgDrag + "",
          style: iconStyle
        }), activeUpload === 'active' ? upload(store, web3t) : void 8, activePreview === 'active' ? preview(store, web3t) : void 8
      ])
    ]);
  };
  module.exports = function(arg$){
    var store, web3t, closeUploadLink, style, accountBodyStyle, borderStyle, lang, children;
    store = arg$.store, web3t = arg$.web3t;
    if (store.video.uploadLink !== true) {
      return null;
    }
    closeUploadLink = function(){
      return store.video.uploadLink = false;
    };
    style = getPrimaryInfo(store);
    accountBodyStyle = {
      background: style.app.background,
      backgroundColor: style.app.bgspare,
      color: style.app.text
    };
    borderStyle = {
      background: style.app.header,
      color: style.app.text
    };
    lang = getLang(store);
    return react.createElement('div', {
      className: 'manage-account manage-account-488427639'
    }, children = react.createElement('div', {
      style: accountBodyStyle,
      className: 'account-body'
    }, children = [
      react.createElement('div', {
        style: borderStyle,
        className: 'title'
      }, children = [
        react.createElement('div', {
          className: 'subheader'
        }, ' Add'), react.createElement('div', {
          onClick: closeUploadLink,
          className: 'closed'
        }, children = icon('X', 20))
      ]), react.createElement('div', {
        className: 'settings'
      }, children = videoUpload(store, web3t))
    ]));
  };
}).call(this);
