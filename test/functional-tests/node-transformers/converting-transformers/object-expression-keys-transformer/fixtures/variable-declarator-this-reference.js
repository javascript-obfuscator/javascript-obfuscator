var passthrough = value => value;
var foo = this.foo, bar = {baz: passthrough(this.foo)}