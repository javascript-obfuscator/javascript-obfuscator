function foo() {
    var bar = 1;

    return () => {
        const { a } = {a: 2};

        console.log(bar, a);
    };
}
foo();