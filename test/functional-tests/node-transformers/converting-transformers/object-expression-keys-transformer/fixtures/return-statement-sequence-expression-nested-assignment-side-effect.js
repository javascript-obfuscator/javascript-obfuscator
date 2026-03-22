function test() {
    let x, y, val = 0;

    function sideEffect() {
        val = 42;
    }

    return (sideEffect(), x = (y = { foo: val }));
}
