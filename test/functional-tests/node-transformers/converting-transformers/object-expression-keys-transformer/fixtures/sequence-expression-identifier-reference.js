function foo () {
    var foo;
    var bar;
    (foo = {foo: 1}), (bar = {bar: foo.foo});
}