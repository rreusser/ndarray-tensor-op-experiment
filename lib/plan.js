'use strict';

var Plan = function Plan( config ) {
  console.log('config=',config);

}

Plan.prototype.assemble = function( args ) {
  return function() {
    return 5;
  }
}

Plan.prototype.typeSignature = function( args ) {
  return 'default';
};

module.exports = Plan
