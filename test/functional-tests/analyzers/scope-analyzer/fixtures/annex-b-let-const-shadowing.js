function test() {
    let foo = 'outer';
    if (true) {
        function foo() { return 'inner'; }
        foo(); // block-scoped foo
    }
    return foo; // should be 'outer', not the function
}
test();
