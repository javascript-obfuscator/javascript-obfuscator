function test() {
    var foo;

    foo
        ? {
            bar: foo.foo
        }
        : {
            bar: 1
        };
}