// Generated by LiveScript 1.6.0
(function(){
  var localStorage, md5, seedEncrypt, mem, getKey, del, setbkp, set, exists, encrypt, tryMigrate, check, out$ = typeof exports != 'undefined' && exports || this, toString$ = {}.toString;
  localStorage = require('localStorage');
  md5 = require('crypto-js/md5');
  seedEncrypt = require('./seed-encrypt.ls');
  mem = {
    encrypt: null
  };
  getKey = function(value){
    return value + 'cb562eb3-c442-4866-a1a9-70a9';
  };
  out$.del = del = function(){
    return localStorage.setItem('spin', "");
  };
  out$.setbkp = setbkp = function(){
    return localStorage.setItem('spinbkp', localStorage.getItem('spin'));
  };
  out$.set = set = function(value){
    var key, res;
    key = getKey(value);
    res = seedEncrypt.encrypt(value, key);
    return localStorage.setItem('spin', res);
  };
  out$.exists = exists = function(){
    var ref$;
    return ((ref$ = localStorage.getItem('spin')) != null ? ref$ : "") !== "";
  };
  out$.encrypt = encrypt = function(str){
    if (toString$.call(mem.encrypt).slice(8, -1) === 'Function') {
      return mem.encrypt(str);
    }
    return 'unsecure';
  };
  tryMigrate = function(value){
    var res, ref$, key, decrypted, keySseed, sseed;
    res = (ref$ = localStorage.getItem('spin')) != null ? ref$ : "";
    key = getKey(value);
    decrypted = seedEncrypt.decryptOld(res, key);
    if (decrypted !== value) {
      return false;
    }
    localStorage.setItem('spinbkp', localStorage.getItem('spin'));
    localStorage.setItem('sseedbkp', localStorage.getItem('sseed'));
    keySseed = encrypt('sseed');
    localStorage.setItem('spin', seedEncrypt.encrypt(decrypted, key));
    sseed = seedEncrypt.decryptOld((ref$ = localStorage.getItem('sseed')) != null ? ref$ : "", keySseed);
    localStorage.setItem('sseed', seedEncrypt.encrypt(sseed, keySseed));
    console.log("Migration successed");
    return true;
  };
  out$.check = check = function(value){
    var res, ref$, key, decrypted;
    if (toString$.call(value).slice(8, -1) !== 'String') {
      return false;
    }
    if (value.length < 4) {
      return false;
    }
    mem.encrypt = function(str){
      return md5(value + '234ef' + str).toString();
    };
    res = (ref$ = localStorage.getItem('spin')) != null ? ref$ : "";
    if (res.length === 0) {
      return false;
    }
    key = getKey(value);
    decrypted = seedEncrypt.decrypt(res, key);
    if (decrypted === value) {
      return true;
    }
    return tryMigrate(value);
  };
}).call(this);