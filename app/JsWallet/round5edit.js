// Generated by LiveScript 1.6.0
(function(){
  module.exports = function(value){
    if (value == null) {
      return "0";
    }
    return value.toString().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  };
}).call(this);