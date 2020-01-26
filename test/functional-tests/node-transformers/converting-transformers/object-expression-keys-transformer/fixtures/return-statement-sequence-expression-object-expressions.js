function foo () {
    var foo;
    var bar;
    return (foo = {foo: 1}),
        (bar = {bar: 2}),
        bar.bar;
}