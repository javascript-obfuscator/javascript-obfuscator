(function () {
    function foo () {
        function bar () {
            function baz () {
                return 1;
            }

            return baz();
        }

        return bar();
    }

    for (var i = 0; i <= 10000; i++) {
        if (i < 10000) {
            foo();
        } else {
            return foo();
        }
    }
})();