var deepExtend = require('deep-extend')

function diffKeys(o1, o2, needClone) {
  var result = diff(o1, o2)
  if (needClone) {
    result = deepExtend({}, result)
  }
  return result
}

/**
 * get diff of o1 from o2
 * @param  {Object} o1
 * @param  {Object} o2
 * @return {Object}
 */
function diff(o1, o2) {
  if (!o2 || !o1) {
    return o1
  }
  type = needDiff(o1, o2)
  if (type) {
    return diff['diff' + type](o1, o2)
  }
  return false
}


diff.diffArray = function(a1, a2) {
  var len1 = a1.length
  var len2 = a2.length
  var result = {}
  var minLen = Math.min(len1, len2)
  var i
  var ret
  if(!len1) return false
  for (i = 0; i < minLen; ++i) {
    ret = diff(a1[i], a2[i])
    if(ret) result[i] = ret
  }
  if (len1 > len2) {
    for (i = len2; i < len1; ++i) {
      result[i] = a1[i]
    }
  }
  return Object.keys(result).length ? result : false
}

diff.diffObject = function(o1, o2) {
  var result = {}
  var key
  var ret
  for (key in o1) {
    if (!o1.hasOwnProperty(key)) continue
    if (typeof o2[key] === 'undefined') {
      result[key] = o1[key]
    } else {
      ret = diff(o1[key], o2[key])
      if(ret) result[key] = ret
    }
  }
  return Object.keys(result).length ? result : false
}

function needDiff(o1, o2) {
  if (Array.isArray(o1) && Array.isArray(o2)) return 'Array'
  if (isPlainObject(o1) && isPlainObject(o2)) return 'Object'
}

function isPlainObject(obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]' &&
    !(obj.window && obj.window === obj) &&
    Object.getPrototypeOf(obj) === Object.prototype
}


// var o1 = {
//   a: 'hahah',
//   b: {
//     a: 'abc',
//     b: 'sss'
//   },
//   c: 1,
//   d: [1,4,5,6,7, 9, {a: 'dd', d: 'ddd'}]
// }

// var o2 = {
//   a: 'sss',
//   b: {
//     b: 'hahah'
//   },
//   d: [1,4,5,6,7]
// }


// console.log(diffKeys(o1, o2, true))


module.exports = diffKeys

