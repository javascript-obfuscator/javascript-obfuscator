(function () {
    var foo = 1;
    var test = function (foo, bar = foo) {
        return foo + bar;
    }
})();
