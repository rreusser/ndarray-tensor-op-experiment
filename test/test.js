'use strict'

var assert = require('chai').assert
  , parser = require('cwise-parser')
  , tensorOp = require('../lib')
  , ndarray = require('ndarray')


describe( "ndarray-tensor-ops", function() {

  it("throws an error if options not provided",function() {
    assert.throws(function() {
      tensorOp()
    },Error)
  })

  it("matrix multiplication",function() {
    var op = tensorOp({
      args: ['C_ij', 'A_ik', 'B_kj'],
      over: 'k',
      before: function(c,a,b) { c = 0 },
      body: function(c,a,b) { c += a*b }
    })
  })

  it("outer product",function() {
    var op = tensorOp({
      args: ['C_ij', 'A_i', 'B_j'],
      over: 'ij',
      pre: function() {},
      body: function(c,a,b) { c = a*b }
    })
  })

  it("inner product",function() {
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

  it("inner product",function() {
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
