var foo = 1;

function bar() {
    const { a } = {a: 2};

    console.log(foo, a);
}
bar();