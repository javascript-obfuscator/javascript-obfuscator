(function () {
    function target (a, b, c) {
        return '' + a + b + c;
    }

    function id (x) {
        return x;
    }

    function forward () {
        var rest = [1, 2, 3];

        // A spread-forward call `target(...rest)` has `arguments.length === 1`,
        // the same as the plain `id(x)` calls below. It must not reuse a plain
        // single-argument control flow wrapper, otherwise every spread-expanded
        // argument after the first is silently dropped (issue #1423).
        id(1);
        id(2);
        id(3);
        id(4);

        return target(...rest);
    }

    return forward() === '123' ? 'ok' : 'broken';
})();
