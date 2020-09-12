const foo = 'aaa';

function test (a, b) {
    const bar = 'bbb';

    function test1 (a, b) {
        const baz = 'ccc';

        function test2 (a, b) {
            const bark = 'ddd';

            return bark;
        }

        return baz + test2();
    }

    return bar + test1();
}

function test3 (a, b) {
    const hawk = 'eee';

    return hawk;
}

foo + test() + test3();