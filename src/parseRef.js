var toInt = require('./toInt')

module.exports = function (ref) {
  var m = /^(.*) ([0-9]+):([0-9]+)$/.exec(ref.trim())

  if (!m) {
    return
  }

  return {
    book: m[1],
    chapter: toInt(m[2]),
    verse: toInt(m[3])
  }
}
