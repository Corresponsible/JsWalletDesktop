// Generated by LiveScript 1.6.0
(function(){
  module.exports = function(){
    var m, r;
    m = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return r = (function(){
      switch (false) {
      case !(m > 800):
        return 'desktop';
      default:
        return 'mobile';
      }
    }());
  };
}).call(this);
