var passthrough = (object) => object;
var foo = {foo: 1},
    bar = passthrough({bar: foo.foo});