var Foo = class {
    getInstance () {
        return new Foo();
    }
};

new Foo();