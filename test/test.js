'use strict'

var assert = require('chai').assert
  , parser = require('cwise-parser')
  , tensorOp = require('../lib')
  , ndarray = require('ndarray')
  , iota = require('iota-array')


describe( 'ndarray-tensor-ops', function() {

  it('throws an error if options not provided',function() {
    assert.throws(function() {
      tensorOp()
    },Error)
  })

  xit('matrix multiplication',function() {
    var op = tensorOp({
      args: ['C_ij', 'A_ik', 'B_kj'],
      over: 'k',
      before: function(c,a,b) { c = 0 },
      body: function(c,a,b) { c += a*b }
    })
  })

  xit('outer product',function() {
    var op = tensorOp({
      args: ['C_ij', 'A_i', 'B_j'],
      over: 'ij',
      pre: function() {},
      body: function(c,a,b) { c = a*b }
    })
  })

  xit('inner product',function() {
    var op = tensorOp({
      args: ['A_i', 'B_i'],
      over: 'i',
      pre: function() { this.sum =  0 },
      body: function(c,a,b) { this.sum += a*b },
      post: function() { return Math.sqrt(this.sum) }
    })
    var rawOp = op.assemble(ndarray([1,2],[2]), ndarray([3,4],[2]))
    assert.isFunction(rawOp)
  })

  it('\n\na regular old operation',function() {
    var op = tensorOp({
      args: ['A_ij'],
      over: 'ij',
      body: function(a) { a *= 2 },
    })
    var rawOp = op.assemble(ndarray([1,2,3,4],[2,2]))
    assert.isFunction(rawOp)
  })


  it('\n\ntensor contraction',function() {
    var op = tensorOp({
      args: ['A_ii'],
      over: 'i',
      pre: function() { this.sum =  0 },
      body: function(a) { this.sum += a*a },
      post: function() { return this.sum }
    })
    var rawOp = op.assemble(ndarray([1,2],[2]), ndarray([3,4],[2]))
    assert.isFunction(rawOp)
  })

  it('\n\nmean along slices of a high-dimensional array',function() {
    var op = tensorOp({
      args: ['A_ijklm', 'index', 'B_jmlk', 'scalar'],
      over: 'kml',
      pre: function() { this.sum =  0 },
      body: function(a,i,b,y) {
        var x = 7 + y
        this.sum += a + x*i[0] + b
        a /= 2
      },
      post: function() { return this.sum }
    })
    var rawOp = op.assemble(ndarray(iota(32),[2,2,2,2,2]))
    assert.isFunction(rawOp,12)
  })

  xit('inner product',function() {
    var op = tensorOp({
      args: ['A_i', 'B_i'],
      over: 'i',
      pre: function() { this.sum =  0 },
      body: function(c,a,b) { this.sum += a*b },
      post: function() { return Math.sqrt(this.sum) }
    })

    var result = op(ndarray([1,2],[2]), ndarray([3,4],[2]))
    assert.closeTo( result, 11, 1e-8 )
  })

})
