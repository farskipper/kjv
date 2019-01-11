var _ = require('lodash')
var test = require('ava')
var verses = require('./json/verses-1769')
var parseRef = require('./src/parseRef')

test('parseRef', function (t) {
  t.is(parseRef('foo'), void 0)

  t.deepEqual(parseRef(' foo 0123:456  '), {
    book: 'foo',
    chapter: 123,
    verse: 456
  })

  t.true(_.every(verses, function (txt, ref) {
    var r = parseRef(ref)
    var ref2 = r.book + ' ' + r.chapter + ':' + r.verse
    var pass = ref === ref2
    if (!pass) {
      t.fail(ref + ' !== ' + ref2)
    }
    return pass
  }), 'ensure all verses parse')
})

test('verses - normalized text format', function (t) {
  t.true(_.every(verses, function (txt, ref) {
    var pass = /^([0-9] )?[a-zA-Z]+('s Song)? [0-9]+:[0-9]+$/.test(ref)
    if (!pass) {
      t.fail(ref)
    }
    return pass
  }), 'standard ref format')

  t.true(_.every(verses, function (txt, ref) {
    var pass = /^(# )?[a-zA-Z'.,;:!?\-[\]() ]+$/.test(txt)
    if (!pass) {
      t.fail(ref + ' ' + txt)
    }
    return pass
  }), 'standard text chars')
})

test('verses - number order', function (t) {
  var currBook
  var prevChap = 0
  var prevVerse = 0
  t.true(_.every(verses, function (txt, ref) {
    var r = parseRef(ref)
    if (r.book !== currBook) {
      currBook = r.book
      prevChap = 0
      prevVerse = 0
    }
    if (r.chapter !== prevChap) {
      prevVerse = 0
      if (prevChap + 1 !== r.chapter) {
        t.fail('Chapter out of order: ' + ref)
        return false
      }
    }
    if (prevVerse + 1 !== r.verse) {
      t.fail('Verse out of order: ' + ref)
      return false
    }
    prevChap = r.chapter
    prevVerse = r.verse
    return true
  }), 'number order')
})
