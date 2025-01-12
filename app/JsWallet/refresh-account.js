// Generated by LiveScript 1.6.0
(function(){
  var newAccount, refreshWallet, ref$, toJS, transaction, map, pairsToObj, find, mirror, applyTransactions, scamWarning, seedmem, refreshWaletTxs, setAccount, refreshAccount, refreshTxs, backgroundRefreshAccount, out$ = typeof exports != 'undefined' && exports || this;
  newAccount = require('./new-account.js');
  refreshWallet = require('./refresh-wallet.js');
  ref$ = require('mobx'), toJS = ref$.toJS, transaction = ref$.transaction;
  ref$ = require('prelude-ls'), map = ref$.map, pairsToObj = ref$.pairsToObj, find = ref$.find;
  mirror = require('./mirror.js');
  applyTransactions = require('./apply-transactions.js');
  scamWarning = require('./scam-warning.js');
  seedmem = require('./seed.js');
  refreshWaletTxs = require('./refresh-txs.js');
  out$.setAccount = setAccount = function(web3, store, cb){
    return newAccount(store, seedmem.mnemonic, function(err, account){
      if (err != null) {
        return cb(err);
      }
      store.current.account = account;
      mirror.accountAddresses = pairsToObj(
      map(function(it){
        return [it.coin.token, it.address];
      })(
      account.wallets));
      return cb(null);
    });
  };
  out$.refreshAccount = refreshAccount = curry$(function(web3, store, cb){
    scamWarning();
    return setAccount(web3, store, function(err){
      var accountName;
      if (err != null) {
        return cb(err);
      }
      store.current.account.accountName = "Anonymous";
      accountName = store.current.account.accountName;
      if (accountName !== "Anonymous") {
        store.current.nickname = "";
      }
      if (accountName !== "Anonymous") {
        store.current.nicknamefull = accountName;
      }
      return refreshWallet(web3, store, cb);
    });
  });
  refreshTxs = curry$(function(web3, store, cb){
    return refreshWaletTxs(web3, store, function(){});
  });
  out$.backgroundRefreshAccount = backgroundRefreshAccount = function(web3, store, cb){
    var bgStore;
    store.current.refreshing = true;
    bgStore = toJS(store);
    return refreshAccount(web3, bgStore, function(err){
      store.current.refreshing = false;
      if (err != null) {
        return cb(err);
      }
      transaction(function(){
        var wallet;
        wallet = bgStore.current.account.wallets[store.current.walletIndex];
        if (wallet == null) {
          return;
        }
        store.rates = bgStore.rates;
        store.current.account = bgStore.current.account;
        store.current.filter.filterTxsTypes = ['IN', 'OUT'];
        store.current.filter = {
          token: wallet.coin.token
        };
        store.current.balanceUsd = bgStore.current.balanceUsd;
        return refreshTxs(web3, store, function(){
          store.transactions = bgStore.transactions;
          return applyTransactions(store);
        });
      });
      return cb(null);
    });
  };
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
