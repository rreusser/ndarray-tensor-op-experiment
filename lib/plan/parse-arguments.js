'use strict'

module.exports = parseNamedArguments

function parseNamedArguments(args) {
  return args.map(function(arg) {
    switch(arg) {
      case 'index':
        return 'index'
      case 'scalar':
        return 'scalar'
      default:
        var m = arg.match(/([\w]+)_([A-Za-z0-9]+)/)
        if( m ) {
          return m[2].split('')
        } else {
          throw new Error('tensorOp::parseNamedArguments: Error: unexpected argument: ' + arg)
        }
    }
  })
}

