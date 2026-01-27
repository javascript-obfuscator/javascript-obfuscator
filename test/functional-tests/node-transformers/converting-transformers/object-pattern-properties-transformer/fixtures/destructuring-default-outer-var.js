(function() {
    var x = 'outer';
    function f({ a = x } = {}) {
        var x = 'inner';
        return a;
    }
    return f();
})();
