function foo () {
    (this.foo = 1), (this.bar = {bar: this.foo});
}