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

// Class with static initialization block - dead code should NOT be injected here with `arguments`
class MyClass {
    static value;

    static {
        console.log('static block');
        MyClass.value = 42;
    }

    method() {
        console.log('method');
    }
}

console.log(MyClass.value);
logArgs(1, 2, 3);
foo('test');
bar('a', 'b');
