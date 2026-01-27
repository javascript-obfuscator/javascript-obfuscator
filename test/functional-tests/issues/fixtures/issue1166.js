// Function that uses `arguments` - this block can be collected for dead code injection
function logArgs() {
    console.log(arguments);
    console.log(arguments.length);
}

function foo() {
    console.log(arguments[0]);
}

function bar() {
    var args = arguments;
    return args;
}

// Class with field initializers - dead code should NOT be injected here with `arguments`
class MyClass {
    field1 = (() => {
        console.log('initializer');
        return 1;
    })();

    field2 = 2;

    method() {
        console.log('method');
    }
}

new MyClass();
logArgs(1, 2, 3);
foo('test');
bar('a', 'b');
