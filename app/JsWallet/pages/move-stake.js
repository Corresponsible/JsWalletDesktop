// Generated by LiveScript 1.6.0
(function(){
  var react, amountField, textField, button, alert, canMakeStaking, ref$, vlxToEth, ethToVlx, getLang, div, times, plus, minus, isValidAddress, filter, roundNumber, tryParseAddress;
  react = require('react');
  amountField = require('../components/amount-field.js');
  textField = require('../components/text-field.js');
  button = require('../components/button.js');
  alert = require('./confirmation.js').alert;
  canMakeStaking = require('../staking/can-make-staking.js');
  ref$ = require('../../web3t/addresses.js'), vlxToEth = ref$.vlxToEth, ethToVlx = ref$.ethToVlx;
  getLang = require('../get-lang.js');
  ref$ = require('../math.js'), div = ref$.div, times = ref$.times, plus = ref$.plus, minus = ref$.minus;
  isValidAddress = require('../api.js').isValidAddress;
  filter = require('prelude-ls').filter;
  roundNumber = require('../round-number.js');
  tryParseAddress = function(address, cb){
    var err;
    try {
      return cb(null, vlxToEth(address));
    } catch (e$) {
      err = e$;
      return cb(err);
    }
  };
  module.exports = function(store, web3t){
    var stakingAddress, ref$, lang, ref1$, cb, wallets, wallet, moveStake, changeStake, changeAddress, children;
    if (store.staking.chosenPool == null) {
      return null;
    }
    if (+store.staking.stakeAmountTotal === 0) {
      return null;
    }
    if (+store.staking.maxWithdrawAllowed === 0) {
      return null;
    }
    stakingAddress = (ref$ = store.staking.keystore.staking) != null ? ref$.address : void 8;
    if (stakingAddress == null) {
      return null;
    }
    lang = getLang(store);
    store.staking.error = (ref1$ = store.staking.error) != null ? ref1$ : "";
    cb = console.log;
    wallets = filter(function(it){
      return it.coin.token === 'vlx2';
    })(
    store.current.account.wallets);
    if (wallets.length === 0) {
      return cb("VLX Wallet not found");
    }
    wallet = wallets[0];
    moveStake = function(){
      var poolAddress, myStake;
      if ((store.staking.error != null && (store.staking.error + "").length > 0) || store.staking.add.newAddress === "") {
        return;
      }
      poolAddress = store.staking.chosenPool.address;
      myStake = div(store.staking.chosenPool.myStake, Math.pow(10, 18));
      return tryParseAddress(store.staking.add.newAddress, function(err, newPoolAddress){
        if (err != null) {
          return alert(store, err, cb);
        }
        return web3t.velas.Staking.stakeAmount(newPoolAddress, stakingAddress, function(err, newPoolStaked){
          var newPoolStakeRounded, maxMoveAmount;
          if (err != null) {
            return cb(err);
          }
          newPoolStakeRounded = +div(newPoolStaked.toFixed(), Math.pow(10, 18));
          if (+myStake < 10000) {
            return alert(store, "Your stake must be more than 10000 VLX in order to move stake to another pool", cb);
          }
          if (+myStake - +store.staking.add.moveStake !== 0) {
            if (+myStake - +store.staking.add.moveStake < 10000) {
              maxMoveAmount = Math.max(+myStake - +store.staking.add.moveStake, 0);
              return alert(store, "The pool stake amount after moving " + store.staking.add.moveStake + " VLX must be at least 10000 VLX or no stake at all.", cb);
            }
          }
          if (+newPoolStakeRounded < 10000 && +store.staking.add.moveStake < 10000) {
            return alert(store, "Move stake amount must be more or equal to 10000 VLX.", cb);
          }
          return canMakeStaking(store, web3t, function(err){
            var stake;
            if (err != null) {
              return alert(store, err, cb);
            }
            stake = store.staking.add.moveStake;
            return web3t.velas.Staking.maxWithdrawAllowed(poolAddress, stakingAddress, function(err, max){
              var maxAllowed, amount, data, to;
              if (err != null) {
                return alert(store, err, cb);
              }
              maxAllowed = div(max.toFixed(), Math.pow(10, 18));
              if (+maxAllowed === 0) {
                return alert(store, "You cannot move from the pool which is a validator or going to become one. Please use Request Exit feature instead.");
              }
              if (+stake > +maxAllowed) {
                return alert(store, "Stake must be lower or equal to max allowed " + maxAllowed, cb);
              }
              if (+stake === 0) {
                return alert(store, "Stake must be more then 0", cb);
              }
              amount = times(stake, Math.pow(10, 18));
              data = web3t.velas.Staking.moveStake.getData(poolAddress, newPoolAddress, amount);
              to = web3t.velas.Staking.address;
              return web3t.vlx2.sendTransaction({
                to: to,
                data: data,
                amount: 0
              }, function(err){});
            });
          });
        });
      });
    };
    changeStake = function(it){
      var amount, decimalsConfig, decimals, maxAmount;
      amount = it.target.value;
      decimalsConfig = wallet.network.decimals;
      decimals = amount.toString().split(".")[1];
      if (decimals != null && decimals.length > decimalsConfig) {
        amount = roundNumber(amount, {
          decimals: decimalsConfig
        });
      }
      maxAmount = 1e18;
      if (+amount > maxAmount) {
        return false;
      }
      return store.staking.add.moveStake = amount;
    };
    changeAddress = function(it){
      var address, ref$, cb;
      address = ((ref$ = it.target.value) != null ? ref$ : "").trim();
      store.staking.add.newAddress = address;
      if (address.length === 0) {
        return store.staking.error = "Address is empty";
      }
      cb = console.log;
      isValidAddress({
        address: store.staking.add.newAddress,
        network: wallet.network
      }, function(err){
        if (err != null && (err + "").indexOf("Given address is not valid Velas address") > -1) {
          return store.staking.error = "Address is not valid";
        }
        return store.staking.error = '';
      });
    };
    return react.createElement('div', {
      className: 'section section-877430629'
    }, children = [
      react.createElement('div', {
        className: 'title'
      }, children = react.createElement('h3', {}, ' ' + lang.moveStake)), react.createElement('div', {
        className: 'description'
      }, children = [
        react.createElement('div', {}, children = [
          react.createElement('label', {}, ' ' + lang.moveAmount), amountField({
            store: store,
            value: store.staking.add.moveStake,
            onChange: changeStake,
            placeholder: lang.stake
          })
        ]), react.createElement('div', {}, children = [
          react.createElement('label', {}, ' ' + lang.newPoolAddress), textField({
            store: store,
            value: store.staking.add.newAddress,
            onChange: changeAddress,
            placeholder: lang.stake
          }), react.createElement('div', {
            title: store.staking.error + "",
            className: 'control-label not-enough text-left'
          }, ' ' + store.staking.error)
        ]), react.createElement('div', {}, children = button({
          store: store,
          onClick: moveStake,
          type: 'secondary',
          icon: 'apply',
          text: 'btnApply'
        }))
      ])
    ]);
  };
}).call(this);
