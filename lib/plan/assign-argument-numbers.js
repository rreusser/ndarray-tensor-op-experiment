'use strict'

module.exports = assignArgumentNumbers

function assignArgumentNumbers(args, over) {
  var i,j,c, arg, outer=[], argj, mapping={}

  // Loop over arguments, skipping anything that's not an array
  for(i=0, arg=args[0]; i<args.length; arg=args[++i]) {
    if( ! Array.isArray(args[i]) ) continue

    // Loop over each argument's indices, adding this to the list
    // of outer indices if it's not a member of 'over':
    for(j=0, argj=arg[0]; j<arg.length; argj=arg[++j]) {
      if( over.indexOf(argj) === -1 && outer.indexOf(argj) === -1 ) outer.push(argj)
    }
  }

  // Assign numbers to outer indices first:
  for(c=0, i=0; i<outer.length; i++) mapping[outer[i]] = c++

  // Then number the over indices in the order specified:
  for(i=0; i<over.length; i++) mapping[over[i]] = c++

  return mapping
}
