(function () {
    var test = function ({ bar: baz = '' }) {
        return bar + baz;
    }
})();
