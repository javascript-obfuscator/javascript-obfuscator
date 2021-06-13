function test() {
    this.foo
        ? {
            bar: this.foo
        }
        : {
            bar: 1
        };
}