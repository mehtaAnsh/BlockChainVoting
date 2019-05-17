'use strict'

exports.toCallback = (doWork) => {
  return function (input, callback) {
    let res
    try {
      res = doWork(input)
    } catch (err) {
      process.nextTick(callback, err)
      return
    }

    process.nextTick(callback, null, res)
  }
}

exports.toBuf = (doWork, other) => (input) => {
  let result = doWork(input, other)
  return Buffer.from(result, 'hex')
}

exports.fromString = (doWork, other) => (_input) => {
  const input = Buffer.isBuffer(_input) ? _input.toString() : _input
  return doWork(input, other)
}

exports.fromNumberTo32BitBuf = (doWork, other) => (input) => {
  let number = doWork(input, other)
  const bytes = new Array(4)

  for (let i = 0; i < 4; i++) {
    bytes[i] = number & 0xff
    number = number >> 8
  }

  return Buffer.from(bytes)
}
