'use strict';

var Plan = function Plan( config ) {
  //console.log('config=',config);
}

Plan.prototype.assemble = function( args ) {
  return function() {
    return 11;
  }
}

Plan.prototype.typeSignature = function( args ) {
  return 'default';
};

module.exports = Plan
