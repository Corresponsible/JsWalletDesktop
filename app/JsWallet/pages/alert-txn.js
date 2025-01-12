// Generated by LiveScript 1.6.0
(function(){
  var react, getPrimaryInfo, getLang, filter;
  react = require('react');
  getPrimaryInfo = require('../get-primary-info.js');
  getLang = require('../get-lang.js');
  filter = require('prelude-ls').filter;
  module.exports = function(arg$){
    var store, web3t, lang, hasPending, children;
    store = arg$.store, web3t = arg$.web3t;
    lang = getLang(store);
    hasPending = function(it){
      return it.length > 0;
    }(
    filter(function(it){
      return it.pending;
    })(
    filter(function(it){
      return it.token === 'vlx2';
    })(
    store.transactions.applied)));
    if (!hasPending) {
      return null;
    }
    return react.createElement('div', {
      className: 'title alert txn title1089447129'
    }, children = react.createElement('div', {
      className: 'header'
    }, ' ' + lang.pendingTransactions));
  };
}).call(this);
