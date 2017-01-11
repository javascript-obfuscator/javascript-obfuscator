(function () {
    try {

    } catch (t) {
        return function () {
            function baz (t) {
                console.log(t);
            }

            return {t: t};
            var t;
        }();
    }
})();