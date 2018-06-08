(function() {
    var obj = {
        foo: 1,
        bar: 2,
        baz: 3
    };
    var {foo, ...rest} = obj;
})();