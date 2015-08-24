'use strict'

module.exports = remapArguments

function remapArguments() {
  var i,j,arg, inArgs = arguments[0], outArgs, map, inArg, outArg

  if( arguments.length === 2 ) {
    outArgs = arguments[0]
    map = arguments[1]
  } else {
    outArgs = arguments[1]
    map = arguments[2]
  }

  // Loop over arguments, skipping anything that's not an array
  for(i=0; i<inArgs.length; i++) {
    inArg = inArgs[i]

    if( Array.isArray(inArg) ) {
      if( (outArg=outArgs[i]) === undefined ) {
        outArg = outArgs[i] = []
      }
    } else {
      if( outArgs[i] === undefined ) {
        outArgs[i] = inArgs[i]
      }
      continue
    }

    for(j=0; j<inArg.length; j++) {
      outArg[j] = map(inArg[j])
    }
  }
  return outArgs
}

