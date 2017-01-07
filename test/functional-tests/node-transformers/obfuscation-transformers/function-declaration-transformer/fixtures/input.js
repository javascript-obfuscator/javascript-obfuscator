function foo () {
    function bar () {
    }

    if (true) {
        bar();
    }
}

if (true) {
    foo();
}
