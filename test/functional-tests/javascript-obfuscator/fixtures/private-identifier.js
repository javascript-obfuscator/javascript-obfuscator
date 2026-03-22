class Foo {
    #bar = 1;

    method() {
        this.#bar = 2;
    }

    #privateMethod() {
        return this.#bar;
    }

    run() {
        this.method();
        return this.#privateMethod();
    }
}
