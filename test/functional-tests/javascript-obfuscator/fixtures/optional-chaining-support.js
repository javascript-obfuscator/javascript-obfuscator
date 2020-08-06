function test() {
    const foo = {
        bar: () => {}
    };

    foo?.bar?.();
}