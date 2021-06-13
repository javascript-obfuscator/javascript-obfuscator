function test() {
    return this.foo
        ? {
            bar: this.foo
        }
        : {
            bar: 1
        };
}