let foo = 1;
class Foo {
    static abc;

    static {
        let bar = 2;
        Foo.abc = 3;
        foo = 4;
        bar = 5;
    }
}