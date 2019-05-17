/**
 * Implementation of the multicodec specification.
 *
 * @module multicodec
 * @example
 * const multicodec = require('multicodec')
 *
 * const prefixedProtobuf = multicodec.addPrefix('protobuf', protobufBuffer)
 * // prefixedProtobuf 0x50...
 *
 */
'use strict'

const varint = require('varint')
const codecNameToCodeVarint = require('./varint-table')
const codeToCodecName = require('./name-table')
const util = require('./util')

exports = module.exports

/**
 * Prefix a buffer with a multicodec-packed.
 *
 * @param {string|number} multicodecStrOrCode
 * @param {Buffer} data
 * @returns {Buffer}
 */
exports.addPrefix = (multicodecStrOrCode, data) => {
  let prefix

  if (Buffer.isBuffer(multicodecStrOrCode)) {
    prefix = util.varintBufferEncode(multicodecStrOrCode)
  } else {
    if (codecNameToCodeVarint[multicodecStrOrCode]) {
      prefix = codecNameToCodeVarint[multicodecStrOrCode]
    } else {
      throw new Error('multicodec not recognized')
    }
  }
  return Buffer.concat([prefix, data])
}

/**
 * Decapsulate the multicodec-packed prefix from the data.
 *
 * @param {Buffer} data
 * @returns {Buffer}
 */
exports.rmPrefix = (data) => {
  varint.decode(data)
  return data.slice(varint.decode.bytes)
}

/**
 * Get the codec of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {string}
 */
exports.getCodec = (prefixedData) => {
  const code = util.varintBufferDecode(prefixedData)
  const codecName = codeToCodecName[code.toString('hex')]
  if (codecName === undefined) {
    throw new Error('Code `0x' + code.toString('hex') + '` not found')
  }
  return codecName
}

/**
 * Get the code of the prefixed data.
 * @param {Buffer} prefixedData
 * @returns {number}
 */
exports.getCode = (prefixedData) => {
  return varint.decode(prefixedData)
}

/**
 * Get the code as varint of a codec name.
 * @param {string} codecName
 * @returns {Buffer}
 */
exports.getCodeVarint = (codecName) => {
  const code = codecNameToCodeVarint[codecName]
  if (code === undefined) {
    throw new Error('Codec `' + codecName + '` not found')
  }
  return code
}

/**
 * Get the varint of a code.
 * @param {Number} code
 * @returns {Array.<number>}
 */
exports.getVarint = (code) => {
  return varint.encode(code)
}

// Make the constants top-level constants
const constants = require('./constants')
Object.assign(exports, constants)

// Human friendly names for printing, e.g. in error messages
exports.print = require('./print')
