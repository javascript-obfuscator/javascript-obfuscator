function foo() {
    var bar = 1;

    return ({a}) => {
        console.log(bar, a);
    }
}
foo();