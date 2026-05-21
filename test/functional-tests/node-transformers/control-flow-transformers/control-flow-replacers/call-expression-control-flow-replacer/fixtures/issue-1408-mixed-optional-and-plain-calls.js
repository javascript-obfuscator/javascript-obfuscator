(function () {
    function noise (n) {
        var acc = 0;
        for (var i = 0; i < n; i++) {
            if (i % 2 === 0) {
                acc += i;
            } else {
                acc ^= i;
            }
        }
        return acc;
    }

    function bump (v) {
        return v + 1;
    }

    function outer () {
        var captured = undefined;
        var inner = function (msg) {
            captured?.(msg);
            return 'ok';
        };
        return inner('payload');
    }

    noise(50);
    bump(7);
    noise(25);
    bump(13);
    return outer();
})();
