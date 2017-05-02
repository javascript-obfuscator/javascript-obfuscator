class Foo {
    constructor() {
        if (new.target === Foo) {}
    }
}
