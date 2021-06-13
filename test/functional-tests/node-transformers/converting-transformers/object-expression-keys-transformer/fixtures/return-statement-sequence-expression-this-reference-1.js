function foo () {
    return (this.foo = 1),
        (this.bar = {bar: this.foo});
}