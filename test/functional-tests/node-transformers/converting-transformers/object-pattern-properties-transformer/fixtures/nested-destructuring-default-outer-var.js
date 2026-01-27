(function() {
    var x = 'outer';
    function f({ a: { b = x } } = { a: {} }) {
        var x = 'inner';
        return b;
    }
    return f();
})();
