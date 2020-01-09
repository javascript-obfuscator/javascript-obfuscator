let foo = 'foo';
let bar = 'bar';
let baz = 'baz';
let bark = 'bark';
let hawk = 'hawk';

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