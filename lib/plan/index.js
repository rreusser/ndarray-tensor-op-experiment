'use strict'

var parseArgs = require('./parse-arguments')
  , assignArgNumbers = require('./assign-argument-numbers')
  , remapArgs = require('./remap-arguments')

module.exports = Plan

function Plan( config ) {

  var plan = {}, over

  this.blockSize = config.blockSize === undefined ? 64 : config.blockSize

  if( config.over === undefined ) {
    throw new Error("tensorOp: Error: you must specify indices over which to perorm a tensor operation.")
  } else {
    over = config.over.split('')
  }

  var parsedArgs = parseArgs( config.args )
  var argMapping = assignArgNumbers( parsedArgs, over )

  var argMapFunc = function(i) { return argMapping[i] }

  this.args = remapArgs( parsedArgs, argMapFunc )
  this.over = over.map( argMapFunc )

  return this
}

Plan.prototype.typeSignature = function() {
  return arguments.length
}

Plan.prototype.assemble = function( pre, body, post, args ) {
  return function() {
    return 11
  }
}
