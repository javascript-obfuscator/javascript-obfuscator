function test() {
    var foo;

    return foo
        ? {
            bar: foo.foo
        }
        : {
            bar: 1
        };
}