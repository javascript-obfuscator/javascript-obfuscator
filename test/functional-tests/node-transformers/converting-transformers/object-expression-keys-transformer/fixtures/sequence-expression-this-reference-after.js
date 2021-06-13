function foo () {
    (this.foo = {foo: 'foo'}), (this.foo = 'foo');
}