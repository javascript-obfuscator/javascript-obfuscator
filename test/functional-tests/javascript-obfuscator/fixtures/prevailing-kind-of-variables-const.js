const foo = 'foo';
const bar = 'bar';
const baz = 'baz';
const bark = 'bark';
const hawk = 'hawk';

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