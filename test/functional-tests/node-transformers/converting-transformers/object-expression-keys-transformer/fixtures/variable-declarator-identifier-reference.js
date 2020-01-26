var passthrough = value => value;
var foo = 1, bar = {baz: passthrough(foo)}