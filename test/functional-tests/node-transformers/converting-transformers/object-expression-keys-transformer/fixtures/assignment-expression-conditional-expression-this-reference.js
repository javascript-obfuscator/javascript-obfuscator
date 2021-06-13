function test() {
    this.bar = this.foo
        ? {
            bar: this.foo
        }
        : {
            bar: 1
        };
}