function foo () {
    var foo;
    var bar;
    return (foo = {foo: 1}),
        (bar = {bar: foo.foo}),
        bar.bar;
}