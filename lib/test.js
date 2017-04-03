var diff = require('./index.js')

var o1 = {
  a: 'hahah',
  b: {
    a: 'abc',
    b: 'sss'
  },
  c: 1,
  d: [1,4,5,6,7, 9, {a: 'dd', d: 'ddd'}]
}

var o2 = {
  a: 'sss',
  b: {
    b: 'hahah'
  },
  d: [1,4,5,6,7]
}


var d = diff(o1, o2, true)

console.log(diff.merge(o2, d))

