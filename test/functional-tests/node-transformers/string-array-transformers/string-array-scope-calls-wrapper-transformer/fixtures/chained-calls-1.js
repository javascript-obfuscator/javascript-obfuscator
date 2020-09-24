const foo = 'aaa';

function test (a, b) {
    const bar = 'bbb';
    const baz = 'ccc';

    function test1 (a, b) {
        const bark = 'ddd';
        const hawk = 'eee';

        function test2 (a, b) {
            const bark = 'ddd';
            const hawk = 'eee';

            return bark + hawk;
        }

        return bark + hawk;
    }

    return bar + baz + test1();
}

foo + test();