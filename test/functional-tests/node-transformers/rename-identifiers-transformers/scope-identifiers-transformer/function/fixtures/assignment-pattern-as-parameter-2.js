(function () {
    var foo = 1;
    var test = function (bar = foo) {
        return bar;
    }
})();
