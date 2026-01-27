'use strict';
function test() {
    let foo;
    if (true) {
        function foo() { return 'inner'; }
        foo(); // This refers to block-scoped foo
    }
    // foo here is the outer let, which is undefined
    return typeof foo;
}
test();
