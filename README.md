# [WIP] ndarray-tensor-ops

[![Build Status](https://travis-ci.org/scijs/ndarray-tensor-ops.svg)](https://travis-ci.org/scijs/ndarray-tensor-ops) [![npm version](https://badge.fury.io/js/ndarray-tensor-ops.svg)](http://badge.fury.io/js/ndarray-tensor-ops) [![Dependency Status](https://david-dm.org/scijs/ndarray-tensor-ops.svg)](https://david-dm.org/scijs/ndarray-tensor-ops)

Perform tensor operations on ndarrays


## Introduction

At the moment just a thin shell of a tensor operator framework. It uses the definition of an operator to create a plan. Then, based on the type signature of actual arguments, will apply transformations (loop reordering, etc.) to assemble and cache that plan into an optimized function. Also includes the ability to bypass the cache for fast repeated operation on similar inputs.

## Install

```sh
$ npm install ndarray-tensor-ops
```


## API

#### `tensorOp( options )`

**Returns:** returns an operator from the cache 

### Methods

#### `.assemble( arguments )`

**Returns:** returns the raw function


## Credits

(c) 2015 Ricky Reusser. MIT License
