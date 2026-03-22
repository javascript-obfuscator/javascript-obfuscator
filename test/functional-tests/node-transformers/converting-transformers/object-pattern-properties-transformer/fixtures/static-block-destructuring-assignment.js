(function() {
    class Foo {
        static result;
        static {
            let x;
            ({ x } = { x: 42 });
            Foo.result = x;
        }
    }
    return Foo.result;
})()
