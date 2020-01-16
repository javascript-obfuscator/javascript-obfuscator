(function () {
    class Foo {
        getInstance () {
            return new Foo();
        }
    }

    new Foo();
})();