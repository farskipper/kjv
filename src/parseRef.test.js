var _ = require("lodash");
var tape = require("tape");
var verses = require("../json/verses");
var parseRef = require("./parseRef");

tape("parseRef", function(t){

    t.equals(parseRef("foo"), void 0);

    t.deepEquals(parseRef(" foo 0123:456  "), {
        book: "foo",
        chapter: 123,
        verse: 456,
    });

    t.ok(_.every(verses, function(txt, ref){
        var r = parseRef(ref);
        var ref2 = r.book + " " + r.chapter + ":" + r.verse;
        var pass = ref === ref2;
        if(!pass){
            t.fail(ref + " !== " + ref2);
        }
        return pass;
    }), "ensure all verses parse");

    t.end();
});
