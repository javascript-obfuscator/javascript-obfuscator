(function () {
    function foo (t, e) {
        return function () {
            function baz (t) {
                console.log(t);
            }

            return {t: t};
            var t;
        }();
    }
})();