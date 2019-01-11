var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var lexed = require('./lex')

var layout = []
var verses = {}

var currBook
var currChap
var ref
var o
var i
for (i = 0; i < lexed.length; i++) {
  o = lexed[i]
  if (o[0] === 'BOOK') {
    currBook = o[1]
    layout.push(['BOOK', o[1]])
  } else if (o[0] === 'CHAPTER') {
    currChap = o[1]
    layout.push(['CHAPTER', o[1]])
  } else if (o[0] === 'PARAGRAPH') {
    layout.push(['PARAGRAPH'])
  } else if (o[0] === 'VERSE') {
    ref = currBook + ' ' + currChap + ':' + o[1]
    if (_.has(verses, ref)) {
      throw new Error('already has: ' + ref + '\n\n' + verses[ref] + '\n\n' + o[2])
    }
    verses[ref] = o[2]
    layout.push(['VERSE', ref])
  } else if (o[0] === 'TXT') {
    layout.push(['TXT', o[1]])
  } else {
    throw new Error('Not Handled: ' + o[0])
  }
}

var writeJSON = function (name, data) {
  var str = _.isArray(data)
    ? '[\n' + _.map(data, function (v) {
      return JSON.stringify(v)
    }).join(',\n') + '\n]'
    : '{\n' + _.map(data, function (v, k) {
      return JSON.stringify(k) + ':' + JSON.stringify(v)
    }).join(',\n') + '\n}'

  var file = path.resolve(__dirname, '../../json/' + name)
  fs.writeFileSync(file, str, 'utf8')
}

writeJSON('layout-1769.json', layout)
writeJSON('verses-1769.json', verses)
