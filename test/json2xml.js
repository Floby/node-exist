var a = require('assert'),
exist = require('exist');

exports.json2xmlWithoutAttr = function (test) {

    var obj = {
        event: {
            foo: 'bar',
            bonjour: {
                en: 'hello',
                ko: 'annyung',
            },
            love: 'hate'
        }
    };

    var result = '<event><foo>bar</foo><bonjour><en>hello</en><ko>annyung</ko></bonjour><love>hate</love></event>';

    test.equal(exist.json2xml(obj), result);
    test.done();
}

exports.json2xmlWithAttr = function (test) {
    var obj2 = {
        event: {
            '@': {foo: 'bar'},
            bonjour: {
                en: 'hello',
                ko: 'annyung',
            },
            love: 'hate'
        }
    };

    var result = '<event foo="bar"><bonjour><en>hello</en><ko>annyung</ko></bonjour><love>hate</love></event>';

    test.equal(exist.json2xml(obj2), result);
    test.done();
}
