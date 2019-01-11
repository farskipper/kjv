# kjv

[![Build Status](https://travis-ci.org/farskipper/kjv.svg)](https://travis-ci.org/farskipper/kjv)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

King James Version of the Holy Bible as JSON

Example:

```js
var verses = require('kjv/json/verses-1769.json')


console.log(verses['John 3:16'])
// "# For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
```

The pound sign `#` is for new paragraph. Words in brackets `[..]` are italic.

## License

Public Domain
