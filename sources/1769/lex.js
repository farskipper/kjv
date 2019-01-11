var _ = require('lodash')
var fs = require('fs')

var toInt = function (str) {
  return _.parseInt(str, 10) || 0
}

var books = {
  'THE FIRST BOOK OF MOSES, CALLED @ GENESIS': 'Genesis',
  'THE SECOND BOOK OF MOSES, CALLED @ EXODUS': 'Exodus',
  'THE THIRD BOOK OF MOSES, CALLED @ LEVITICUS': 'Leviticus',
  'THE FOURTH BOOK OF MOSES, CALLED @ NUMBERS': 'Numbers',
  'THE FIFTH BOOK OF MOSES, CALLED @ DEUTERONOMY': 'Deuteronomy',
  'THE BOOK OF @ JOSHUA': 'Joshua',
  'THE BOOK OF @ JUDGES': 'Judges',
  'THE BOOK OF @ RUTH': 'Ruth',
  'THE FIRST BOOK OF @ SAMUEL @ OTHERWISE CALLED, THE FIRST BOOK OF THE KINGS': '1 Samuel',
  'THE SECOND BOOK OF @ SAMUEL @ OTHERWISE CALLED, THE SECOND BOOK OF THE KINGS': '2 Samuel',
  'THE FIRST BOOK OF THE @ KINGS @ COMMONLY CALLED, THE THIRD BOOK OF THE KINGS': '1 Kings',
  'THE SECOND BOOK OF THE @ KINGS @ COMMONLY CALLED, THE FOURTH BOOK OF THE KINGS': '2 Kings',
  'THE FIRST BOOK OF THE @ CHRONICLES': '1 Chronicles',
  'THE SECOND BOOK OF THE @ CHRONICLES': '2 Chronicles',
  'EZRA': 'Ezra',
  'THE BOOK OF @ NEHEMIAH': 'Nehemiah',
  'THE BOOK OF @ ESTHER': 'Esther',
  'THE BOOK OF @ JOB': 'Job',
  'THE BOOK OF PSALMS': 'Psalms',
  'THE @ PROVERBS': 'Proverbs',
  'ECCLESIASTES @ OR, THE PREACHER': 'Ecclesiastes',
  'THE @ SONG OF SOLOMON': "Solomon's Song",
  'THE BOOK OF THE PROPHET @ ISAIAH': 'Isaiah',
  'THE BOOK OF THE PROPHET @ JEREMIAH': 'Jeremiah',
  'THE @ LAMENTATIONS @ OF JEREMIAH': 'Lamentations',
  'THE BOOK OF THE PROPHET @ EZEKIEL': 'Ezekiel',
  'THE BOOK OF @ DANIEL': 'Daniel',
  'HOSEA': 'Hosea',
  'JOEL': 'Joel',
  'AMOS': 'Amos',
  'OBADIAH': 'Obadiah',
  'JONAH': 'Jonah',
  'MICAH': 'Micah',
  'NAHUM': 'Nahum',
  'HABAKKUK': 'Habakkuk',
  'ZEPHANIAH': 'Zephaniah',
  'HAGGAI': 'Haggai',
  'ZECHARIAH': 'Zechariah',
  'MALACHI': 'Malachi',
  'THE GOSPEL ACCORDING TO @ SAINT MATTHEW': 'Matthew',
  'THE GOSPEL ACCORDING TO @ SAINT MARK': 'Mark',
  'THE GOSPEL ACCORDING TO @ SAINT LUKE': 'Luke',
  'THE GOSPEL ACCORDING TO @ SAINT JOHN': 'John',
  'THE @ ACTS @ OF THE APOSTLES': 'Acts',
  'THE EPISTLE OF PAUL THE APOSTLE TO THE @ ROMANS': 'Romans',
  'THE FIRST EPISTLE OF PAUL THE APOSTLE TO THE @ CORINTHIANS': '1 Corinthians',
  'THE SECOND EPISTLE OF PAUL THE APOSTLE TO THE @ CORINTHIANS': '2 Corinthians',
  'THE EPISTLE OF PAUL THE APOSTLE TO THE @ GALATIANS': 'Galatians',
  'THE EPISTLE OF PAUL THE APOSTLE TO THE @ EPHESIANS': 'Ephesians',
  'THE EPISTLE OF PAUL THE APOSTLE TO THE @ PHILIPPIANS': 'Philippians',
  'THE EPISTLE OF PAUL THE APOSTLE TO THE @ COLOSSIANS': 'Colossians',
  'THE FIRST EPISTLE OF PAUL THE APOSTLE TO THE @ THESSALONIANS': '1 Thessalonians',
  'THE SECOND EPISTLE OF PAUL THE APOSTLE TO THE @ THESSALONIANS': '2 Thessalonians',
  'THE FIRST EPISTLE OF PAUL THE APOSTLE TO @ TIMOTHY': '1 Timothy',
  'THE SECOND EPISTLE OF PAUL THE APOSTLE TO @ TIMOTHY': '2 Timothy',
  'THE EPISTLE OF PAUL TO @ TITUS': 'Titus',
  'THE EPISTLE OF PAUL TO @ PHILEMON': 'Philemon',
  'THE EPISTLE OF PAUL THE APOSTLE TO THE @ HEBREWS': 'Hebrews',
  'THE GENERAL EPISTLE OF @ JAMES': 'James',
  'THE FIRST EPISTLE GENERAL OF @ PETER': '1 Peter',
  'THE SECOND EPISTLE GENERAL OF @ PETER': '2 Peter',
  'THE FIRST GENERAL EPISTLE OF @ JOHN': '1 John',
  'THE SECOND EPISTLE OF @ JOHN': '2 John',
  'THE THIRD EPISTLE OF @ JOHN': '3 John',
  'THE GENERAL EPISTLE OF @ JUDE': 'Jude',
  'THE @ REVELATION @ OF SAINT JOHN THE DIVINE': 'Revelation'
}

var out = []
var lines = fs.readFileSync('./THB_KJV_1769_AV_TEXT.txt', 'utf8').split('\n')

var startedFirstBook = false

var line
var i
for (i = 0; i < lines.length; i++) {
  line = lines[i].trim()
  if (line.length === 0) {
    continue
  }
  if (!startedFirstBook) {
    if (_.has(books, line)) {
      startedFirstBook = true
    } else {
      out.push(['TXT', line])
      continue
    }
  }

  var mChap = /^(CHAPTER|PSALM) ([0-9]+)$/.exec(line)
  var mVerse = /^([0-9]+) (.*)$/.exec(line)
  if (_.has(books, line)) {
    out.push(['BOOK', books[line]])
  } else if (mChap) {
    out.push(['CHAPTER', toInt(mChap[2])])
  } else if (mVerse) {
    var text = mVerse[2].trim()
    if (text[0] === '#') {
      out.push(['PARAGRAPH'])
    }
    out.push(['VERSE', toInt(mVerse[1]), text])
  } else {
    out.push(['TXT', line])
  }
}

module.exports = out
