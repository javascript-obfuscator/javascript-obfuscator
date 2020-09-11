const foo = 'aaa';

function test () {
    const bar = 'bbb';
    const baz = 'ccc';

    function test1 () {
        const bark = 'ddd';
        const hawk = 'eee';

        return bark + hawk;
    }

    return bar + baz + test1();
}

foo + test();