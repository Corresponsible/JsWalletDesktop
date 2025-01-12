// Generated by LiveScript 1.6.0
(function(){
  var react, reactDom, navigate, getPrimaryInfo, web3, bignumber, getLang, historyFuncs, queryPools, icon, ref$, map, split, filter, find, foldl, sortBy, unique, head, each, div, times, plus, minus, hdkey, bip39, md5, menuFuncs, btoa, Buffer, copiedInform, copy, round5, ethToVlx, switchAccount, roundHuman, exitStake, icons, placeholder, claimStake, canMakeStaking, epoch, alert, button, addressHolder, alertTxn, amountField, moveStake, seedmem, burger, moment, cb, getPair, toKeystore, showValidator, nolocksContent, nolocks, stringify, fillLockupContract, fillLockupContracts, toString$ = {}.toString, slice$ = [].slice;
  react = require('react');
  reactDom = require('react-dom');
  navigate = require('../navigate.js');
  getPrimaryInfo = require('../get-primary-info.js');
  web3 = require('../web3.js');
  bignumber = require('bignumber.js');
  getLang = require('../get-lang.js');
  historyFuncs = require('../history-funcs.js');
  queryPools = require('../stake-funcs.js').queryPools;
  icon = require('./icon.js');
  ref$ = require('prelude-ls'), map = ref$.map, split = ref$.split, filter = ref$.filter, find = ref$.find, foldl = ref$.foldl, sortBy = ref$.sortBy, unique = ref$.unique, head = ref$.head, each = ref$.each;
  ref$ = require('../math.js'), div = ref$.div, times = ref$.times, plus = ref$.plus, minus = ref$.minus;
  ref$ = require('../../web3t/providers/deps.js'), hdkey = ref$.hdkey, bip39 = ref$.bip39;
  md5 = require('md5');
  menuFuncs = require('../menu-funcs.js');
  btoa = require('btoa');
  Buffer = require('safe-buffer').Buffer;
  copiedInform = require('../copied-inform.js');
  copy = require('../copy.js');
  round5 = require('../round5.js');
  ethToVlx = require('../../web3t/addresses.js').ethToVlx;
  switchAccount = require('./switch-account.js');
  roundHuman = require('../round-human.js');
  exitStake = require('./exit-stake.js');
  icons = require('../icons.js');
  placeholder = require('./placeholder.js');
  claimStake = require('./claim-stake.js');
  canMakeStaking = require('../staking/can-make-staking.js');
  epoch = require('./epoch.js');
  alert = require('./confirmation.js').alert;
  button = require('../components/button.js');
  addressHolder = require('../components/address-holder.js');
  alertTxn = require('./alert-txn.js');
  amountField = require('../components/amount-field.js');
  moveStake = require('./move-stake.js');
  seedmem = require('../seed.js');
  burger = require('../components/burger.js');
  moment = require('moment');
  cb = console.log;
  getPair = function(wallet, path, index, password, withKeystore){
    var w, address, salt, iv, uuid, kdf, keystore;
    w = wallet.derivePath(path).deriveChild(index).getWallet();
    address = "0x" + w.getAddress().toString('hex');
    salt = Buffer.from('dc9e4a98886738bd8aae134a1f89aaa5a502c3fbd10e336136d4d5fe47448ad6', 'hex');
    iv = Buffer.from('cecacd85e9cb89788b5aab2f93361233', 'hex');
    uuid = Buffer.from('7e59dc028d42d09db29aa8a0f862cc81', 'hex');
    kdf = 'pbkdf2';
    keystore = (function(){
      switch (false) {
      case !withKeystore:
        return w.toV3String(password, {
          salt: salt,
          iv: iv,
          uuid: uuid,
          kdf: kdf
        });
      default:
        return "";
      }
    }());
    return {
      address: address,
      keystore: keystore
    };
  };
  toKeystore = function(store, withKeystore){
    var mnemonic, seed, wallet, index, password, staking, mining;
    mnemonic = seedmem.mnemonic;
    seed = bip39.mnemonicToSeed(mnemonic);
    wallet = hdkey.fromMasterSeed(seed);
    index = store.current.accountIndex;
    password = md5(wallet.derivePath("m1").deriveChild(index).getWallet().getAddress().toString('hex'));
    staking = (function(){
      switch (false) {
      case store.urlParams.anotheracc == null:
        return {
          address: window.toEthAddress(store.urlParams.anotheracc)
        };
      default:
        return getPair(wallet, 'm0', index, password, false);
      }
    }());
    mining = getPair(wallet, 'm0/2', index, password, withKeystore);
    return {
      staking: staking,
      mining: mining,
      password: password
    };
  };
  showValidator = function(store, web3t){
    return function(validator){
      return react.createElement('li', {}, ' ' + validator);
    };
  };
  nolocksContent = function(store, web3t){
    var goBack, style, lang, pairs, becomeValidator, changeAddress, changeStake, getBalance, getOptions, useMin, useMax, voteForChange, yourBalance, yourStakingAmount, yourStaking, vlxToken, chooseNolock, buildNolock, cancelPool, refresh, iconStyle, stakerPoolStyle, stats, children;
    goBack = historyFuncs(store, web3t).goBack;
    style = getPrimaryInfo(store);
    lang = getLang(store);
    pairs = store.staking.keystore;
    becomeValidator = function(){
      return getOptions(function(err, options){
        if (err != null) {
          return alert(store, err, cb);
        }
        return canMakeStaking(store, web3t, function(err){
          var type, stake, data, to, amount;
          if (err != null) {
            return alert(store, err, cb);
          }
          if (store.staking.chosenPool == null) {
            return alert(store, "please choose the pool", cb);
          }
          type = toString$.call(store.staking.add.addValidatorStake).slice(8, -1);
          if (type !== 'String' && type !== 'Number') {
            return alert(store, "please enter correct amount, got " + type, cb);
          }
          stake = times(store.staking.add.addValidatorStake, Math.pow(10, 18));
          data = web3t.velas.Staking.stake.getData(store.staking.chosenPool.address, stake);
          to = web3t.velas.Staking.address;
          amount = store.staking.add.addValidatorStake;
          return web3t.vlx2.sendTransaction({
            to: to,
            data: data,
            amount: amount
          }, function(err){
            if (err != null) {
              return store.staking.add.result = err + "";
            }
            return staking.init({
              store: store,
              web3t: web3t
            }, function(){});
          });
        });
      });
    };
    changeAddress = function(it){
      return store.staking.add.addValidator = it.target.value;
    };
    changeStake = function(it){
      var value, err;
      try {
        value = new bignumber(it.target.value).toFixed().toString();
        store.staking.add.addValidatorStake = value;
      } catch (e$) {
        err = e$;
        console.log("[Change-stake]: " + err);
      }
    };
    if (pairs.mining == null) {
      return null;
    }
    getBalance = function(){
      var wallet;
      wallet = find(function(it){
        return it.coin.token === 'vlx2';
      })(
      store.current.account.wallets);
      return wallet.balance;
    };
    getOptions = function(cb){
      return web3t.velas.Staking.candidateMinStake(function(err, data){
        var min, balance, stake, max;
        if (err != null) {
          return cb(err);
        }
        min = (function(){
          switch (false) {
          case !(+store.staking.stakeAmountTotal >= 10000):
            return 1;
          default:
            return div(data, Math.pow(10, 18));
          }
        }());
        balance = minus(getBalance(), 0.1);
        stake = store.staking.add.addValidatorStake;
        if (10000 > +stake) {
          return cb(lang.amountLessStaking);
        }
        if (+balance < +stake) {
          return cb(lang.balanceLessStaking);
        }
        max = +balance;
        return cb(null, {
          min: min,
          max: max
        });
      });
    };
    useMin = function(){
      return store.staking.add.addValidatorStake = 10000;
    };
    useMax = function(){
      return store.staking.add.addValidatorStake = Math.max(minus(getBalance(), 0.1), 0);
    };
    voteForChange = function(){
      return web3t.velas.ValidatorSet.emitInitiateChangeCallable(function(err, can){
        var data, to, amount;
        if (err != null) {
          return alert(store, err, cb);
        }
        if (can !== true) {
          return alert(store, lang.actionProhibited, cb);
        }
        data = web3t.velas.ValidatorSet.emitInitiateChange.getData();
        to = web3t.velas.ValidatorSet.address;
        amount = 0;
        return web3t.vlx2.sendTransaction({
          to: to,
          data: data,
          amount: amount
        }, function(err){
          return store.current.page = 'staking';
        });
      });
    };
    yourBalance = " " + roundHuman(getBalance()) + " ";
    yourStakingAmount = div(store.staking.stakeAmountTotal, Math.pow(10, 18));
    yourStaking = " " + roundHuman(yourStakingAmount);
    vlxToken = "VLX";
    chooseNolock = function(){
      var page;
      page = 'choosestaker';
      store.lockups.lockupWasChoosed = true;
      store.lockups.choosedLockup = item;
      item.checked = true;
      store.lockups.error = "";
      return cb(null);
    };
    buildNolock = function(store, web3t){
      return function(item){
        var address, lockedFunds, stake, lockedFundsReleaseTime, index, vlx2, wallet, lockedUntil, children;
        address = item.address, lockedFunds = item.lockedFunds, stake = item.stake, lockedFundsReleaseTime = item.lockedFundsReleaseTime;
        stake = roundHuman(parseFloat(div(item.stake, Math.pow(10, 18))));
        index = store.lockups.lockupContracts.indexOf(item) + 1;
        vlx2 = find(function(it){
          return it.coin.token === 'vlx2';
        })(
        store.current.account.wallets);
        wallet = {
          address: ethToVlx(item.address),
          network: vlx2.network,
          coin: vlx2.coin
        };
        lockedUntil = lockedFundsReleaseTime != null ? moment(lockedFundsReleaseTime).format("DD MM YYYY hh:mm") : "..";
        return react.createElement('tr', {
          className: item.status + ""
        }, children = [
          react.createElement('td', {}, children = react.createElement('span', {
            className: item.status + " circle"
          }, ' ' + index)), react.createElement('td', {
            datacolumn: 'Staker Address',
            title: ethToVlx(item.address) + ""
          }, children = addressHolder({
            store: store,
            wallet: wallet
          })), react.createElement('td', {}, ' ' + lockedFunds), react.createElement('td', {}, ' ' + stake + ' '), react.createElement('td', {}, ' ' + lockedUntil + '       '), react.createElement('td', {}, children = button({
            store: store,
            onClick: chooseNolock,
            type: 'secondary',
            icon: 'arrowRight'
          }))
        ]);
      };
    };
    cancelPool = function(){
      store.staking.chosenPool = null;
      return store.staking.poolWasChoosed = false;
    };
    refresh = function(){
      var cb;
      store.staking.allPoolsLoaded = false;
      if ((store.staking.allPoolsLoaded === false || store.staking.allPoolsLoaded == null) && store.staking.poolsAreLoading === true) {
        return false;
      }
      store.staking.poolsAreLoading = true;
      cb = console.log;
      return cb(null, 'done');
    };
    iconStyle = {
      color: style.app.loader,
      marginTop: "10px",
      width: "inherit"
    };
    stakerPoolStyle = {
      maxWidth: 200,
      background: style.app.stats
    };
    stats = {
      background: style.app.stats
    };
    return react.createElement('div', {
      className: 'staking-content delegate'
    }, children = [
      !store.staking.poolWasChoosed && !store.lockups.lockupWasChoosed ? react.createElement('div', {
        className: 'main-sections'
      }, children = react.createElement('div', {
        id: "lockups",
        className: 'form-group'
      }, children = react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' No-lock contracts')), react.createElement('div', {
          className: 'description table-scroll no-lock'
        }, children = react.createElement('table', {}, children = [
          react.createElement('thead', {}, children = [
            react.createElement('th', {
              width: "3%",
              style: stats
            }, ' #'), react.createElement('th', {
              width: "40%",
              style: stakerPoolStyle
            }, ' Address'), react.createElement('th', {
              width: "20%",
              style: stats
            }, ' Locked Amount'), react.createElement('th', {
              width: "20%",
              style: stats
            }, ' Staked Amount'), react.createElement('th', {
              width: "10%",
              style: stats
            }, ' Locked Until'), react.createElement('th', {
              width: "9%",
              style: stats
            }, ' Select')
          ]), react.createElement('tbody', {}, children = map(buildNolock(store, web3t))(
          store.lockups.lockupContracts))
        ]))
      ]))) : void 8, store.lockups.lockupWasChoosed ? react.createElement('div', {
        className: 'none'
      }, ' Hello') : void 8
    ]);
  };
  nolocks = function(arg$){
    var store, web3t, children;
    store = arg$.store, web3t = arg$.web3t;
    return react.createElement('div', {
      className: 'nolocks-content'
    }, children = nolocksContent(store, web3t));
  };
  stringify = function(value){
    if (value != null) {
      return roundHuman(parseFloat(div(value, Math.pow(10, 18))));
    } else {
      return '..';
    }
  };
  fillLockupContract = function(arg$, arg1$, cb){
    var web3t, store, contract, contracts, item, TimeLock;
    web3t = arg$.web3t, store = arg$.store;
    contract = arg1$[0], contracts = slice$.call(arg1$, 1);
    if (contract == null) {
      return cb(null, []);
    }
    item = {};
    TimeLock = web3t.velas.Timelock.at(contract);
    return TimeLock.getLockedFunds(function(err, lockedFunds){
      if (err != null) {
        return cb(err);
      }
      item.address = contract;
      item.lockedFundsRaw = lockedFunds;
      item.lockedFunds = +lockedFunds !== 0 ? roundHuman(parseFloat(div(lockedFunds, Math.pow(10, 18)))) : 0;
      item.status = 'inactive';
      return TimeLock.getPool(function(err, lockedPool){
        if (err != null) {
          return cb(err);
        }
        item.lockedPool = lockedPool;
        return web3t.velas.Staking.stakeAmount(lockedPool, contract, function(err, amount){
          var ref$;
          if (err != null) {
            return cb(err);
          }
          store.lockups.lockupStaking[lockedPool] = (ref$ = store.lockups.lockupStaking[lockedPool]) != null
            ? ref$
            : [];
          store.lockups.lockupStaking[lockedPool].push(amount);
          item.stake = amount;
          return TimeLock.getLockedFundsReleaseTime(function(err, lockedFundsReleaseTime){
            var _item;
            if (err != null) {
              return cb(err);
            }
            item.lockedFundsReleaseTime = lockedFundsReleaseTime;
            _item = [item];
            return fillLockupContract({
              web3t: web3t,
              store: store
            }, contracts, function(err, rest){
              var all;
              all = _item.concat(rest);
              return cb(null, all);
            });
          });
        });
      });
    });
  };
  fillLockupContracts = function(arg$, contracts, cb){
    var web3t, store;
    web3t = arg$.web3t, store = arg$.store;
    return fillLockupContract({
      web3t: web3t,
      store: store
    }, contracts, function(err, res){
      if (err != null) {
        return cb(err);
      }
      return cb(null, res);
    });
  };
  nolocks.init = function(arg$, cb){
    var store, web3t, vlx2;
    store = arg$.store, web3t = arg$.web3t;
    store.lockups.lockupWasChoosed = false;
    store.staking.poolWasChoosed = false;
    vlx2 = find(function(it){
      return it.coin.token === 'vlx2';
    })(
    store.current.account.wallets);
    return web3t.velas.Resolver.getLockups(vlx2.address2, function(err, lockups){
      if (err != null) {
        return cb(err);
      }
      store.lockups.lockupStaking = {};
      return fillLockupContracts({
        web3t: web3t,
        store: store
      }, lockups, function(err, result){
        if (err != null) {
          return cb(err);
        }
        store.lockups.lockupContracts = result;
        return cb(null);
      });
    });
  };
  module.exports = nolocks;
}).call(this);
