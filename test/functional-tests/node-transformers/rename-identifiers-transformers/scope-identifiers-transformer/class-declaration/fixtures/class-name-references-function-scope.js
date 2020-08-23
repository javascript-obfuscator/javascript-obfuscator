function foo () {
    class B {
        foo() {
            return B;
        }
    }

    console.log(B);
}