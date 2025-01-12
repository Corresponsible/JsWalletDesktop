// Generated by LiveScript 1.6.0
(function(){
  var react, reactDom, navigate, getPrimaryInfo, web3, getLang, historyFuncs, icon, ref$, map, split, filter, div, times, plus, velasNodeTemplate, hdkey, bip39, md5, menuFuncs, btoa, Buffer, CopyToClipboard, copiedInform, copy, switchAccount, icons, placeholder, epoch, alertDemo, seedmem, burger, getPair, toKeystore, showValidator, stakingContent, staking, slice$ = [].slice;
  react = require('react');
  reactDom = require('react-dom');
  navigate = require('../navigate.js');
  getPrimaryInfo = require('../get-primary-info.js');
  web3 = require('../web3.js');
  getLang = require('../get-lang.js');
  historyFuncs = require('../history-funcs.js');
  icon = require('./icon.js');
  ref$ = require('prelude-ls'), map = ref$.map, split = ref$.split, filter = ref$.filter;
  ref$ = require('../math.js'), div = ref$.div, times = ref$.times, plus = ref$.plus;
  velasNodeTemplate = require('../velas/velas-node-template.js');
  ref$ = require('../../web3t/providers/deps.js'), hdkey = ref$.hdkey, bip39 = ref$.bip39;
  md5 = require('md5');
  menuFuncs = require('../menu-funcs.js');
  btoa = require('btoa');
  Buffer = require('safe-buffer').Buffer;
  CopyToClipboard = require('react-copy-to-clipboard').CopyToClipboard;
  copiedInform = require('../copied-inform.js');
  copy = require('../copy.js');
  switchAccount = require('./switch-account.js');
  icons = require('../icons.js');
  placeholder = require('./placeholder.js');
  epoch = require('./epoch.js');
  alertDemo = require('./alert-demo.js');
  seedmem = require('../seed.js');
  burger = require('../components/burger.js');
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
    var seed, wallet, index, password, staking, mining;
    seed = bip39.mnemonicToSeed(seedmem.mnemonic);
    wallet = hdkey.fromMasterSeed(seed);
    index = store.current.accountIndex;
    password = md5(wallet.derivePath("m1").deriveChild(index).getWallet().getAddress().toString('hex'));
    staking = getPair(wallet, 'm0', index, password, false);
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
  stakingContent = function(store, web3t){
    var style, lang, inputStyle, buttonPrimary2Style, buttonPrimary4Style, filterIcon, commingSoon, pairs, becomeValidator, changeAddress, changeStake, velasNodeAppliedTemplate, velasNodeAppliedTemplateLine, showScript, ref$, accountLeft, accountRight, changeAccountIndex, updateCurrent, accountLeftProxy, accountRightProxy, changeAccountIndexProxy, buildTemplateLine, lineStyle, activate, activateLine, activateString, activateSsh, activateDo, activeClass, activeLine, activeString, activeSsh, activeDo, calcRewardEpoch, calcReward, claim, exit, children;
    style = getPrimaryInfo(store);
    lang = getLang(store);
    inputStyle = {
      background: style.app.wallet,
      color: style.app.text,
      overflowX: 'auto',
      marginTop: '10px'
    };
    buttonPrimary2Style = {
      border: "1px solid " + style.app.primary2,
      color: style.app.text,
      background: style.app.primary2,
      backgroundColor: style.app.primary2Spare
    };
    buttonPrimary4Style = {
      border: "1px solid " + style.app.primary4,
      color: style.app.text,
      background: style.app.primary4,
      margin: "0"
    };
    filterIcon = {
      filter: style.app.filterIcon
    };
    commingSoon = {
      opacity: ".3"
    };
    pairs = store.staking.keystore;
    becomeValidator = function(){
      var stake, data, to, amount;
      stake = times(store.staking.add.addValidatorStake, Math.pow(10, 18));
      data = web3t.velas.Staking.addPool.getData(stake, pairs.mining.address);
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
    };
    changeAddress = function(it){
      return store.staking.add.addValidator = it.target.value;
    };
    changeStake = function(it){
      return store.staking.add.addValidatorStake = it.target.value;
    };
    velasNodeAppliedTemplate = split("\n")(
    velasNodeTemplate(
    pairs));
    velasNodeAppliedTemplateLine = function(it){
      return "echo '" + it + "' | base64 --decode | sh";
    }(
    btoa(
    velasNodeTemplate(
    pairs)));
    if (pairs.mining == null) {
      return null;
    }
    showScript = function(){
      return store.staking.keystore = toKeystore(store, true);
    };
    ref$ = menuFuncs(store, web3t), accountLeft = ref$.accountLeft, accountRight = ref$.accountRight, changeAccountIndex = ref$.changeAccountIndex;
    updateCurrent = function(func){
      return function(data){
        func(data);
        return staking.init({
          store: store,
          web3t: web3t
        }, function(){
          return store.staking.keystore = toKeystore(store, false);
        });
      };
    };
    accountLeftProxy = updateCurrent(accountLeft);
    accountRightProxy = updateCurrent(accountRight);
    changeAccountIndexProxy = updateCurrent(changeAccountIndex);
    buildTemplateLine = function(it){
      var index, lineStyle;
      index = velasNodeAppliedTemplate.indexOf(it);
      lineStyle = {
        padding: "10px",
        width: '100%',
        marginBottom: '2px',
        background: index % 2 ? 'rgba(255, 255, 255, 0.04)' : ''
      };
      return react.createElement('div', {
        style: lineStyle
      }, ' ' + it);
    };
    lineStyle = {
      padding: "10px",
      width: '100%'
    };
    activate = function(tab){
      return function(){
        return store.staking.tab = tab;
      };
    };
    activateLine = activate('line');
    activateString = activate('string');
    activateSsh = activate('ssh');
    activateDo = activate('do');
    activeClass = function(tab){
      if (store.staking.tab === tab) {
        return 'active';
      } else {
        return '';
      }
    };
    activeLine = activeClass('line');
    activeString = activeClass('string');
    activeSsh = activeClass('ssh');
    activeDo = activeClass('do');
    calcRewardEpoch = function(arg$, cb){
      var epoch, epochs, miningAddress;
      epoch = arg$[0], epochs = slice$.call(arg$, 1);
      miningAddress = store.staking.keystore.mining.address;
      if (epoch == null) {
        return cb(null, 0);
      }
      return web3t.velas.BlockReward.getValidatorReward(epoch, miningAddress, function(err, reward){
        if (err != null) {
          return cb(err);
        }
        return calcRewardEpoch(epochs, function(err, rest){
          var all;
          if (err != null) {
            return cb(err);
          }
          all = plus(reward, rest);
          return cb(null, all);
        });
      });
    };
    calcReward = function(){
      var cb, miningAddress, stakingAddress;
      cb = alert;
      miningAddress = store.staking.keystore.mining.address;
      stakingAddress = store.staking.keystore.staking.address;
      return web3t.velas.BlockReward.epochsToClaimRewardFrom(stakingAddress, miningAddress, function(err, epochs){
        if (err != null) {
          return cb(err);
        }
        return calcRewardEpoch(epochs, function(err, reward){
          if (err != null) {
            return cb(err);
          }
          return store.staking.reward = reward;
        });
      });
    };
    claim = function(){
      var stakingAddress, miningAddress;
      stakingAddress = store.staking.keystore.staking.address;
      miningAddress = store.staking.keystore.mining.address;
      return web3t.velas.BlockReward.epochsPoolGotRewardFor(miningAddress, function(err, epochs){
        return web3t.velas.BlockReward.epochsToClaimRewardFrom(stakingAddress, miningAddress, function(err, epochs){
          var data, to, amount;
          if (err != null) {
            return alert(err);
          }
          data = web3t.velas.Staking.claimReward.getData(epochs, stakingAddress);
          to = web3t.velas.Staking.address;
          amount = 0;
          return web3t.vlx2.sendTransaction({
            to: to,
            data: data,
            amount: amount
          }, function(err){});
        });
      });
    };
    exit = function(){
      var stakingAddress, data, to, amount;
      stakingAddress = store.staking.keystore.staking.address;
      data = web3t.velas.Staking.withdraw.getData(stakingAddress, store.staking.add.addValidatorStake);
      to = web3t.velas.Staking.address;
      amount = 0;
      return web3t.vlx2.sendTransaction({
        to: to,
        data: data,
        amount: amount
      }, function(err){});
    };
    return react.createElement('div', {
      className: 'staking-content'
    }, children = react.createElement('div', {
      className: 'form-group'
    }, children = [
      react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Install Node')), react.createElement('div', {
          className: 'description'
        }, children = [
          react.createElement('div', {
            className: 'left-node'
          }, children = react.createElement('img', {
            src: icons.imgNode + ""
          })), react.createElement('div', {
            className: 'right-node'
          }, children = [
            react.createElement('div', {}, ' This script automatically deploys your node through the terminal. Also, it uses addresses associated with your current account to manage the node in the wallet.'), react.createElement('br', {}), react.createElement('div', {}, children = [
              react.createElement('span', {
                className: 'important'
              }, ' Important: '), " Do not transfer this script to anyone, as it is generated in your wallet, using personal wallet data."
            ]), pairs.mining.keystore.length === 0 ? react.createElement('div', {}, children = [
              react.createElement('div', {
                className: 'btn'
              }, children = react.createElement('button', {
                style: buttonPrimary2Style,
                onClick: showScript,
                className: 'btn-width'
              }, children = react.createElement('span', {}, children = [
                react.createElement('img', {
                  src: icons.generate + "",
                  className: 'icon-svg'
                }), " Generate Script"
              ]))), react.createElement('div', {}, ' Please allow 30 seconds')
            ]) : void 8
          ]), pairs.mining.keystore.length > 0 || store.urlParams.dev != null ? react.createElement('div', {}, children = [
            react.createElement('div', {
              className: 'tabs'
            }, children = [
              react.createElement('span', {
                onClick: activateLine,
                className: activeLine + " tab"
              }, ' Line by Line'), react.createElement('span', {
                onClick: activateString,
                className: activeString + " tab"
              }, ' As one single string'), react.createElement('span', {
                onClick: activateSsh,
                className: activeSsh + " tab"
              }, ' Install via ssh'), react.createElement('span', {
                onClick: activateDo,
                className: activeDo + " tab"
              }, ' Install on Digital Ocean')
            ]), activeLine === 'active' ? react.createElement('div', {
              className: 'code'
            }, children = [
              react.createElement('section', {
                className: 'window'
              }, children = [
                react.createElement('section', {
                  className: 'icons'
                }, children = react.createElement('span', {})), react.createElement(CopyToClipboard, {
                  text: velasNodeAppliedTemplate + "",
                  onCopy: copiedInform(store),
                  style: filterIcon,
                  className: 'copy'
                }, children = copy(store))
              ]), map(buildTemplateLine)(
              velasNodeAppliedTemplate)
            ]) : void 8, activeString === 'active' ? react.createElement('div', {
              className: 'code'
            }, children = [
              react.createElement('section', {
                className: 'window'
              }, children = [
                react.createElement('section', {
                  className: 'icons'
                }, children = react.createElement('span', {})), react.createElement(CopyToClipboard, {
                  text: velasNodeAppliedTemplateLine + "",
                  onCopy: copiedInform(store),
                  style: filterIcon,
                  className: 'copy'
                }, children = copy(store))
              ]), react.createElement('div', {
                style: lineStyle
              }, children = velasNodeAppliedTemplateLine)
            ]) : void 8, activeSsh === 'active' ? react.createElement('div', {
              className: 'code'
            }, children = [
              react.createElement('section', {
                className: 'window'
              }, children = [
                react.createElement('section', {
                  className: 'icons'
                }, children = react.createElement('span', {})), react.createElement(CopyToClipboard, {
                  text: "some code",
                  onCopy: copiedInform(store),
                  style: filterIcon,
                  className: 'copy'
                }, children = copy(store))
              ]), react.createElement('div', {
                style: lineStyle
              }, children = [
                " Comming Soon", react.createElement('span', {
                  className: 'cursor'
                }, ' |')
              ])
            ]) : void 8, activeDo === 'active' ? react.createElement('div', {
              className: 'code'
            }, children = [
              react.createElement('section', {
                className: 'window'
              }, children = [
                react.createElement('section', {
                  className: 'icons'
                }, children = react.createElement('span', {})), react.createElement(CopyToClipboard, {
                  text: "some code",
                  onCopy: copiedInform(store),
                  style: filterIcon,
                  className: 'copy'
                }, children = copy(store))
              ]), react.createElement('div', {
                style: lineStyle
              }, children = [
                " Comming Soon", react.createElement('span', {
                  className: 'cursor'
                }, ' |')
              ])
            ]) : void 8
          ]) : void 8
        ])
      ]), react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Become Validator')), react.createElement('div', {
          className: 'description'
        }, children = [
          react.createElement('div', {
            className: 'left'
          }, children = [
            react.createElement('label', {}, ' Your Mining Address'), react.createElement('input', {
              type: 'text',
              value: pairs.mining.address + "",
              readonly: "readonly",
              style: inputStyle,
              placeholder: "mining address"
            })
          ]), react.createElement('div', {
            className: 'left'
          }, children = [
            react.createElement('label', {}, ' Your Stake (VLX)'), react.createElement('input', {
              type: 'text',
              value: store.staking.add.addValidatorStake + "",
              onChange: changeStake,
              style: inputStyle,
              placeholder: "stake"
            })
          ]), react.createElement('button', {
            style: buttonPrimary2Style,
            onClick: becomeValidator
          }, children = react.createElement('span', {}, children = [
            react.createElement('img', {
              src: icons.apply + "",
              className: 'icon-svg'
            }), " Apply"
          ]))
        ])
      ]), store.staking.validators.pending.length > 0 ? react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Pending Validators')), react.createElement('div', {
          className: 'description'
        }, children = react.createElement('ul', {}, children = map(showValidator(store, web3t))(
        filter(function(it){
          return store.staking.validators.active.indexOf(it) === -1;
        })(
        store.staking.validators.pending))))
      ]) : void 8, react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Active Validators. Current epoch: ' + store.staking.epoch)), react.createElement('div', {
          className: 'description'
        }, children = react.createElement('ul', {}, children = map(showValidator(store, web3t))(
        store.staking.validators.active)))
      ]), react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Your Rewards ')), react.createElement('div', {
          className: 'description'
        }, children = store.staking.reward != null
          ? react.createElement('div', {}, children = [
            react.createElement('div', {
              className: 'balance'
            }, children = [react.createElement('span', {}, ' ' + store.staking.reward), react.createElement('span', {}, '  VLX')]), react.createElement('button', {
              style: buttonPrimary2Style,
              onClick: claim
            }, children = react.createElement('span', {}, children = [
              react.createElement('img', {
                src: icons.reward + "",
                className: 'icon-svg'
              }), " Claim Reward"
            ]))
          ])
          : react.createElement('button', {
            style: buttonPrimary2Style,
            onClick: calcReward,
            className: 'btn-width'
          }, children = react.createElement('span', {}, children = [
            react.createElement('img', {
              src: icons.calculate + "",
              className: 'icon-svg'
            }), " Calculate Reward"
          ])))
      ]), react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Account Index')), react.createElement('div', {
          className: 'description'
        }, children = react.createElement('div', {
          className: 'switch-index'
        }, children = [
          react.createElement('span', {
            onClick: accountLeftProxy,
            style: buttonPrimary2Style,
            className: 'button left-proxy'
          }, children = icon('ChevronLeft', 15)), react.createElement('span', {
            className: 'bold'
          }, children = react.createElement('input', {
            value: store.current.accountIndex + "",
            style: inputStyle,
            onChange: changeAccountIndexProxy,
            className: 'change-index'
          })), react.createElement('span', {
            onClick: accountRightProxy,
            style: buttonPrimary2Style,
            className: 'button right-proxy'
          }, children = icon('ChevronRight', 15))
        ]))
      ]), react.createElement('div', {
        className: 'section'
      }, children = [
        react.createElement('div', {
          className: 'title'
        }, children = react.createElement('h3', {}, ' Exit from Validator Pool')), react.createElement('div', {
          className: 'description'
        }, children = react.createElement('button', {
          style: buttonPrimary4Style,
          onClick: exit
        }, children = react.createElement('span', {}, children = [
          react.createElement('img', {
            src: icons.exit + "",
            className: 'icon-svg'
          }), " Exit"
        ])))
      ])
    ]));
  };
  staking = function(arg$){
    var store, web3t, lang, goBack, gotoSearch, info, style, borderStyle, borderRight, buttonPrimary2Style, headerTableStyle, lightText, showClass, children;
    store = arg$.store, web3t = arg$.web3t;
    lang = getLang(store);
    goBack = historyFuncs(store, web3t).goBack;
    gotoSearch = function(){
      return navigate(store, web3t, 'search');
    };
    info = getPrimaryInfo(store);
    style = {
      background: info.app.wallet,
      color: info.app.text
    };
    borderStyle = {
      color: info.app.text,
      borderBottom: "1px solid " + info.app.border,
      background: info.app.background,
      backgroundColor: info.app.bgspare
    };
    borderRight = {
      color: info.app.text,
      borderRight: "1px solid " + info.app.border
    };
    buttonPrimary2Style = {
      border: "1px solid " + info.app.primary2,
      color: info.app.text,
      background: info.app.primary2,
      backgroundColor: info.app.primary2Spare
    };
    headerTableStyle = {
      borderBottom: "1px solid " + info.app.border,
      background: info.app.walletLight
    };
    lightText = {
      color: info.app.color3
    };
    showClass = store.current.openMenu ? 'hide' : "";
    return react.createElement('div', {
      className: 'staking-res staking-res-76570990'
    }, children = [
      alertDemo(store, web3t), react.createElement('div', {
        style: borderStyle,
        className: 'title'
      }, children = [
        react.createElement('div', {
          className: showClass + " header"
        }, ' Resource Staking'), react.createElement('div', {
          onClick: goBack,
          className: 'close'
        }, children = react.createElement('img', {
          src: icons.arrowLeft + "",
          className: 'icon-svg'
        })), burger(store, web3t), epoch(store, web3t), switchAccount(store, web3t)
      ]), stakingContent(store, web3t)
    ]);
  };
  staking.init = function(arg$, cb){
    var store, web3t;
    store = arg$.store, web3t = arg$.web3t;
    store.staking.keystore = toKeystore(store, false);
    return web3t.velas.Staking.candidateMinStake(function(err, data){
      if (err != null) {
        return cb(err);
      }
      store.staking.add.addValidatorStake = div(data, Math.pow(10, 18));
      return web3t.velas.ValidatorSet.getValidators(function(err, data){
        if (err != null) {
          return cb(err);
        }
        store.staking.validators.active = data;
        return web3t.velas.ValidatorSet.getPendingValidators(function(err, data){
          if (err != null) {
            return cb(err);
          }
          store.staking.validators.pending = data;
          return web3t.velas.Staking.stakingEpoch(function(err, epoch){
            store.staking.epoch = epoch.toFixed();
            return cb(null);
          });
        });
      });
    });
  };
  module.exports = staking;
}).call(this);
