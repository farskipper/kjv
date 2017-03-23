var _ = require("lodash");
var tape = require("tape");
var verses = require("../json/verses");
var parseRef = require("./parseRef");

tape("verses - normalized text format", function(t){

    t.ok(_.every(verses, function(txt, ref){
        var pass = /^([0-9] )?[a-zA-Z]+('s Song)? [0-9]+:[0-9]+$/.test(ref);
        if(!pass){
            t.fail(ref);
        }
        return pass;
    }), "standard ref format");

    t.ok(_.every(verses, function(txt, ref){
        var pass = /^(# )?[a-zA-Z'.,;:!?\-\[\]() ]+$/.test(txt);
        if(!pass){
            t.fail(ref + " " + txt);
        }
        return pass;
    }), "standard text chars");

    t.end();
});

tape("verses - number order", function(t){
    var curr_book;
    var prev_chap = 0;
    var prev_verse = 0;
    t.ok(_.every(verses, function(txt, ref){
        var r = parseRef(ref);
        if(r.book !== curr_book){
            curr_book = r.book;
            prev_chap = 0;
            prev_verse = 0;
        }
        if(r.chapter !== prev_chap){
            prev_verse = 0;
            if(prev_chap + 1 !== r.chapter){
                t.fail("Chapter out of order: " + ref);
                return false;
            }
        }
        if(prev_verse + 1 !== r.verse){
            t.fail("Verse out of order: " + ref);
            return false;
        }
        prev_chap = r.chapter;
        prev_verse = r.verse;
        return true;
    }), "number order");
    t.end();
});
