// Basic Annex B case: function in block referenced after block
function test1() {
    if (true) {
        function foo() {
            return 'foo';
        }
    }
    return foo();
}

// Function in switch case
function test2(x) {
    switch (x) {
        case 1:
            function bar() {
                return 'bar';
            }
            break;
    }
    return bar();
}

// Multiple blocks with same function name
function test3() {
    if (true) {
        function baz() {
            return 'first';
        }
    }
    if (false) {
        function baz() {
            return 'second';
        }
    }
    return baz();
}

// Return results for testing
({ test1: test1(), test2: test2(1) });
