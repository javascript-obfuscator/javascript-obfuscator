var foo = 'foo';
var bar = 'bar';
var baz = 'baz';
var bark = 'bark';
var hawk = 'hawk';

function test() {
    var foo = 'foo';

    if (true) {
        foo += 'o';
    }

    if (true) {
        foo += 'o';
    }

    if (true) {
        foo += 'o';
    }

    if (true) {
        foo += 'o';
    }

    if (true) {
        foo += 'o';
    }

    return foo;
}
test();