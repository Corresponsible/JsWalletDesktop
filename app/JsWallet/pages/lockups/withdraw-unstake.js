// Generated by LiveScript 1.6.0
(function(){
  var react, reactDom, getPrimaryInfo, web3, getLang, icons, ref$, map, split, filter, find, foldl, sortBy, unique, head, each, div, times, plus, minus, ethToVlx, canMakeStaking, amountField, button, alert, cb, orderWithdrawProcess, fastWithdrawProcess, notAvailableRightNow, registry;
  react = require('react');
  reactDom = require('react-dom');
  getPrimaryInfo = require('../../get-primary-info.js');
  web3 = require('../../web3.js');
  getLang = require('../../get-lang.js');
  icons = require('../../icons.js');
  ref$ = require('prelude-ls'), map = ref$.map, split = ref$.split, filter = ref$.filter, find = ref$.find, foldl = ref$.foldl, sortBy = ref$.sortBy, unique = ref$.unique, head = ref$.head, each = ref$.each;
  ref$ = require('../../math.js'), div = ref$.div, times = ref$.times, plus = ref$.plus, minus = ref$.minus;
  ethToVlx = require('../../../web3t/addresses.js').ethToVlx;
  canMakeStaking = require('../../staking/can-make-staking.js');
  amountField = require('../../components/amount-field.js');
  button = require('../../components/button.js');
  alert = require('../confirmation.js').alert;
  cb = bind$(console, 'log');
  orderWithdrawProcess = function(store, web3t){
    var lang, activate, activateFirst, activateSecond, activateThird, activeClass, activeFirst, activeSecond, activeThird, order, exit, changeMax, epochNext, ref$, children;
    lang = getLang(store);
    activate = function(step){
      return function(){
        return store.lockups.exitTab = step;
      };
    };
    activateFirst = activate('unstake_order');
    activateSecond = activate('unstake_wait');
    activateThird = activate('unstake_ordered');
    activeClass = function(step){
      if (store.lockups.exitTab === step) {
        return 'active';
      } else {
        return '';
      }
    };
    activeFirst = activeClass('unstake_order');
    activeSecond = activeClass('unstake_wait');
    activeThird = activeClass('unstake_ordered');
    order = function(){
      var poolAddress, contractAddress, Timelock;
      poolAddress = store.lockups.chosenLockup.address;
      contractAddress = store.lockups.chosenLockup.address;
      Timelock = web3t.velas.Timelock.at(contractAddress);
      return Timelock.maxWithdrawAllowed(function(err, max){
        var amount, data, to;
        amount = times(store.lockups.withdrawAmount, Math.pow(10, 18));
        if (+amount > +max.toFixed()) {
          return alert(store, lang.max + " " + div(max.toFixed(), Math.pow(10, 18)));
        }
        if (+amount === 0) {
          return alert(store, lang.actionProhibited, cb);
        }
        data = Timelock.requestUnstake.getData(poolAddress, amount);
        to = Timelock.address;
        amount = 0;
        return web3t.vlx2.sendTransaction({
          to: to,
          data: data,
          amount: amount,
          gas: 4600000,
          gasPrice: 1000000
        }, function(err){});
      });
    };
    exit = function(){
      var poolAddress, data, to, amount;
      if (+store.lockups.orderedWithdrawAmount === 0) {
        return alert(store, lang.actionProhibited, cb);
      }
      poolAddress = store.lockups.chosenLockup.lockedPool;
      data = web3t.velas.Staking.claimOrderedWithdraw.getData(poolAddress);
      to = web3t.velas.Staking.address;
      amount = 0;
      return web3t.vlx2.sendTransaction({
        to: to,
        data: data,
        amount: amount,
        gas: 4600000,
        gasPrice: 1000000
      }, function(err){});
    };
    changeMax = function(it){
      return store.lockups.withdrawAmount = it.target.value;
    };
    epochNext = (ref$ = store.dashboard.epochNext) != null ? ref$ : 'loading...';
    return react.createElement('div', {
      className: 'section'
    }, children = [
      react.createElement('div', {
        className: 'title'
      }, children = react.createElement('h3', {}, ' ' + lang.unstake)), react.createElement('div', {
        className: 'description'
      }, children = react.createElement('div', {
        className: 'left'
      }, children = react.createElement('div', {
        className: 'steps steps2030851689'
      }, children = [
        react.createElement('div', {
          onClickCommented: activateFirst,
          className: activeFirst + " step"
        }, children = [
          react.createElement('div', {
            className: 'step-count'
          }, ' 1'), react.createElement('div', {
            className: 'step-content'
          }, children = [
            react.createElement('div', {}, ' ' + lang.requestExit), activeFirst === 'active' ? react.createElement('div', {}, children = [
              react.createElement('div', {}, children = amountField({
                store: store,
                value: store.lockups.withdrawAmount,
                onChange: changeMax
              })), button({
                store: store,
                text: lang.requestExit,
                icon: 'exit',
                onClick: order,
                type: "secondary"
              })
            ]) : void 8
          ])
        ]), react.createElement('div', {
          onClickCommented: activateSecond,
          className: activeSecond + " step"
        }, children = [
          react.createElement('div', {
            className: 'step-count'
          }, ' 2'), react.createElement('div', {
            className: 'step-content'
          }, ' ' + lang.comeBack)
        ]), react.createElement('div', {
          onClickCommented: activateThird,
          className: activeThird + " step"
        }, children = [
          react.createElement('div', {
            className: 'step-count'
          }, ' 3'), react.createElement('div', {
            className: 'step-content'
          }, children = [
            react.createElement('div', {}, ' ' + lang.withdraw), activeThird === 'active' ? button({
              store: store,
              text: lang.withdraw,
              icon: 'exit',
              onClick: exit,
              type: "secondary"
            }) : void 8
          ])
        ])
      ])))
    ]);
  };
  fastWithdrawProcess = function(store, web3t){
    var lang, withdraw, changeMax, children;
    lang = getLang(store);
    withdraw = function(){
      return canMakeStaking(store, web3t, function(err){
        var ref$, address, lockedPool, maxWithdrawAllowed, lockupAddress, Timelock, contractAddress, amount, vlx2, vlxAddress, data, to;
        if (err != null) {
          return alert(store, err, cb);
        }
        ref$ = store.lockups.chosenLockup, address = ref$.address, lockedPool = ref$.lockedPool, maxWithdrawAllowed = ref$.maxWithdrawAllowed;
        lockupAddress = store.lockups.chosenLockup.address;
        Timelock = web3t.velas.Timelock.at(lockupAddress);
        contractAddress = Timelock.address;
        amount = div(store.lockups.withdrawAmount, Math.pow(10, 18));
        if (+amount === 0) {
          return alert(store, lang.actionProhibited, cb);
        }
        vlx2 = find(function(it){
          return it.coin.token === 'vlx2';
        })(
        store.current.account.wallets);
        vlxAddress = vlx2.address2;
        data = Timelock.withdraw.getData(vlxAddress, amount);
        to = contractAddress;
        return web3t.vlx2.sendTransaction({
          to: to,
          data: data,
          amount: 0
        }, function(err){});
      });
    };
    changeMax = function(it){
      return store.lockups.withdrawAmount = it.target.value;
    };
    return react.createElement('div', {
      className: 'section'
    }, children = [
      react.createElement('div', {
        className: 'title'
      }, children = react.createElement('h3', {}, ' ' + lang.exit)), react.createElement('div', {
        className: 'description'
      }, children = [
        react.createElement('div', {}, ' ' + lang.withdraw), react.createElement('div', {}, children = amountField({
          store: store,
          value: store.lockups.withdrawAmount,
          onChange: changeMax
        })), button({
          store: store,
          text: lang.withdraw,
          icon: 'exit',
          onClick: withdraw,
          type: "secondary"
        })
      ])
    ]);
  };
  notAvailableRightNow = function(store){
    var lang, children;
    lang = getLang(store);
    return react.createElement('div', {
      className: 'section'
    }, children = [
      react.createElement('div', {
        className: 'title'
      }, children = react.createElement('h3', {}, ' ' + lang.exit)), react.createElement('div', {
        className: 'description'
      }, children = react.createElement('div', {}, ' ' + lang.actionProhibited))
    ]);
  };
  registry = {
    'unstake_ordered': orderWithdrawProcess,
    'unstake_order': orderWithdrawProcess,
    'unstake_wait': orderWithdrawProcess,
    'exit': fastWithdrawProcess,
    'unstake_closed': notAvailableRightNow
  };
  module.exports = function(store, web3t){
    var func;
    func = registry[store.lockups.exitTab];
    if (func == null) {
      return null;
    }
    return func(store, web3t);
  };
  module.exports.init = function(arg$, cb){
    var store, web3t, contractAddress, Timelock, stakingAddress, poolAddress;
    store = arg$.store, web3t = arg$.web3t;
    store.lockups.exitTab = '';
    store.lockups.maxWithdrawAllowed = 0;
    store.lockups.maxWithdrawOrderAllowed = 0;
    store.lockups.orderedWithdrawAmount = 0;
    contractAddress = store.lockups.chosenLockup.address;
    Timelock = web3t.velas.Timelock.at(contractAddress);
    console.log("Timelock", Timelock);
    stakingAddress = Timelock.address;
    if (store.lockups.chosenLockup.lockedPool == null) {
      return cb(null);
    }
    poolAddress = store.lockups.chosenLockup.lockedPool;
    console.log("0");
    return Timelock.maxWithdrawAllowed(function(err, max){
      var StakingLockup, amount, res;
      console.log("Timelock.maxWithdrawAllowed", max);
      if (err != null) {
        return cb(err);
      }
      store.lockups.maxWithdrawAllowed = div(max.toFixed(), Math.pow(10, 18));
      if (+store.lockups.maxWithdrawAllowed > 0) {
        store.lockups.withdrawAmount = store.lockups.maxWithdrawAllowed;
      }
      StakingLockup = web3t.velas.StakingLockup.at(Timelock.address);
      console.log("StakingLockup", StakingLockup);
      console.log("1");
      store.lockups.maxWithdrawOrderAllowed = div(max.toFixed(), Math.pow(10, 18));
      if (+store.lockups.maxWithdrawOrderAllowed > 0) {
        store.lockups.withdrawAmount = store.lockups.maxWithdrawOrderAllowed;
      }
      amount = max;
      console.log("2");
      store.lockups.orderedWithdrawAmount = 0;
      console.log("3");
      console.log("4");
      res = false;
      store.lockups.waitForEpochChange = +res === 0 ? true : false;
      store.lockups.exitTab = (function(){
        switch (false) {
        case !(+store.lockups.orderedWithdrawAmount > 0 && store.lockups.waitForEpochChange):
          return 'unstake_wait';
        case !(+store.lockups.orderedWithdrawAmount > 0):
          return 'unstake_ordered';
        case !(+store.lockups.maxWithdrawAllowed > 0):
          return 'exit';
        case !(+store.lockups.maxWithdrawOrderAllowed > 0):
          return 'unstake_order';
        case !(+store.lockups.stakeAmountTotal > 0):
          return 'unstake_closed';
        default:
          return '';
        }
      }());
      return cb(null);
    });
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
}).call(this);
