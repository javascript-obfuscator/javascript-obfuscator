function test() {
    var foo;
    var bar;

    bar = foo
        ? {
            bar: foo.foo
        }
        : {
            bar: 1
        };
}