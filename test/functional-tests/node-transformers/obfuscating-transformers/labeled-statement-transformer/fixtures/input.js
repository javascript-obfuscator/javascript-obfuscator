function foo (label) {
    label:
        for (var i = 0; i < 1000; i++) {
            break label;
            continue label;
        }
}
