function test() {
    var foo;

    var bar = foo
        ? {
            bar: foo.foo
        }
        : {
            bar: 1
        };
}