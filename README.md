# [WIP] ndarray-tensor-op-experiment

[![Build Status](https://travis-ci.org/rreusser/ndarray-tensor-op-experiment.svg)](https://travis-ci.org/rreusser/ndarray-tensor-op-experiment)

Finding out the hard way what it means to implement tensor operations on ndarrays


## Introduction

At the moment just a thin shell of a tensor operator framework. Once implemented, will use the definition of an operator to create a plan. Then, based on the type signature of actual arguments, will apply transformations (loop reordering, etc.) to assemble and cache that plan into an optimized function. Also includes the ability to bypass the cache for fast repeated operation on similar inputs.

There are three primary motivations for this:

1. Work my way through cwise and better understand what it means to implement this sort of thing
2. cwise doesn't quite implement tensor operators
3. benchmark it and understand where the bottlenecks are in streamlining operations, particularly for small inputs.


## Example

Just a sketch of what I'm aiming for. Usage is basically identical to cwise, except you can bypass the assembly/type signature step.

```javascript
var tensorOp = require('ndarray-tensor-op')

var operator = tensorOp({
  <config tbd>
})

var a = ndarray([1,2,3],[3])
var b = ndarray([4,5,6],[3])

// Assemble, cache, and execute the operation:
operator( a, b )

// Optimize this operator for the given inputs:
var raw = operator.assemble( a, b )

// Execute the operation, bypassing cache and assembly:
raw( a, b )
```


## Install

```sh
$ npm install ndarray-tensor-op
```


## API

#### `tensorOp( options )`

**Returns:** returns an operator from the cache 

### Methods

#### `.assemble( arguments )`

**Returns:** returns the raw function


## Credits

(c) 2015 Ricky Reusser. MIT License
