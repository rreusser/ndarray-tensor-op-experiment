'use strict'

var assert = require('chai').assert
  , parser = require('cwise-parser')
  , tensorOp = require('../lib')
  , ndarray = require('ndarray')
  , iota = require('iota-array')
  , Plan = require('../lib/plan')
  , parseNamedArguments = require('../lib/plan/parse-arguments')
  , assignArgumentNumbers = require('../lib/plan/assign-argument-numbers')
  , remapArguments = require('../lib/plan/remap-arguments')


describe( 'parseNamedArguments', function() {

  it('parses one argument', function() {
    assert.deepEqual( parseNamedArguments(['A_ijklm']), [['i','j','k','l','m']] )
  })

  it('parses multiple arguments', function() {
    assert.deepEqual( parseNamedArguments(['A_ijklm', 'C_jk']), [['i','j','k','l','m'],['j','k']] )
  })

  it('permits an index argument', function() {
    assert.deepEqual( parseNamedArguments(['A_ij', 'index']), [['i','j'],'index'] )
  })

  it('permits a scalar argument', function() {
    assert.deepEqual( parseNamedArguments(['A_ij', 'scalar']), [['i','j'],'scalar'] )
  })

  it('throws error if argument type unrecognized', function() {
    assert.throws(function() {
      parseNamedArguments(['A_ij', 'unknown'])
    },Error)
  })

})


describe( 'assignArgumentNumbers', function() {

  it('assigns: C_ij, A_ik, B_kj over k', function() {
    assert.deepEqual(
      assignArgumentNumbers([['i','j'],['i','k'],['k','j']], ['i','j']),
      {i:1, j:2, k:0}
    )
  })

  it('assigns: C_ijklm over ilk', function() {
    assert.deepEqual(
      assignArgumentNumbers([['i','j','k','l','m']], ['i','l','k']),
      {i:2, j:0, k:4, l:3 , m:1 }
    )
  })

  it('inner order is as specified', function() {
    var args = [['i','j','k','l','m']]
    var o1 = assignArgumentNumbers(args, ['i','l','k'])
    var o2 = assignArgumentNumbers(args, ['i','k','l'])
    var o3 = assignArgumentNumbers(args, ['l','k','i'])

    assert.deepEqual(o1, {i:2, j:0, k:4, l:3 , m:1 })
    assert.deepEqual(o2, {i:2, j:0, k:3, l:4 , m:1 })
    assert.deepEqual(o3, {i:4, j:0, k:3, l:2 , m:1 })
  })


  it('ignores other arguments', function() {
    assert.deepEqual(
      assignArgumentNumbers([['i','j'],'scalar','index',['i','k'],['k','j']], ['i','j']),
      {i:1, j:2, k:0}
    )
  })

})


describe( 'remapArguments', function() {

  it('remaps arguments in-place', function() {
    var args = [['i','j'],'scalar','index',['i','k'],['k','j']]
    var map = function(i){ return {i:1, j:2, k:0}[i] }
    var result = remapArguments( args, map )
    assert.deepEqual( result, [[1,2],'scalar','index',[1,0],[0,2]])
    assert.equal( args, result )
  })

  it('remaps arguments out of place', function() {
    var args = [['i','j'],'scalar','index',['i','k'],['k','j']]
    var map = function(i){ return {i:1, j:2, k:0}[i] }
    var result = remapArguments( args, [], map )
    assert.deepEqual( result, [[1,2],'scalar','index',[1,0],[0,2]])
    assert.notEqual( args, result )
  })

})


