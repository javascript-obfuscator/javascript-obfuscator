function foo() {
    if (true) {
        function foo() {}
    } else {
        function bar() {}
    }
}