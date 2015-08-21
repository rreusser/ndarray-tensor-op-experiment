'use strict'

var Plan = require('./plan')

function preprocessOptions(options) {
  var config = {}

  if( options === undefined ) {
    throw new Error('tensorOp: Error: options may not be blank.')
  }

  return options
}

var tensorOpCtor = function tensorOpCtor (options) {

  var scope = {
    cache: {},
    plan: new Plan( preprocessOptions(options) )
  }

  // Based on the type signature, either return or assemble a function:
  var fetch = function() {
    var operator, typesig = this.plan.typeSignature(arguments)
    return this.cache[typesig] || (this.cache[typesig] = this.plan.assemble(arguments))
  }.bind(scope)

  // The thing we return: fetches and executes operator:
  var tensorOperator = function() {
    return (fetch(arguments))(arguments)
  }

  // Add a raw operator to fetch the internal operator:
  tensorOperator.assemble = fetch

  return tensorOperator
}

module.exports = tensorOpCtor
