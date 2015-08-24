'use strict'

var Plan = require('./plan')
  , cwiseParser = require('cwise-parser')

function preprocessOptions(options) {
  var config = {}

  if( options === undefined ) {
    throw new Error('tensorOp: Error: options may not be blank.')
  }

  return options
}

function parseFunctions ( options ) {
  var parsed = {}
  if( options.pre !== undefined ) parsed.pre = cwiseParser( options.pre )
  if( options.body !== undefined ) parsed.body = cwiseParser( options.body )
  if( options.post !== undefined ) parsed.post = cwiseParser( options.post )
  return parsed
}

var tensorOpCtor = function tensorOpCtor (options) {

  var scope = {
    cache: {},
    plan: new Plan( preprocessOptions(options) ),
    parsed: parseFunctions( options )
  }

  console.log( scope.plan )
  console.log( scope.parsed.pre )
  console.log( scope.parsed.body )
  console.log( scope.parsed.post )

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
