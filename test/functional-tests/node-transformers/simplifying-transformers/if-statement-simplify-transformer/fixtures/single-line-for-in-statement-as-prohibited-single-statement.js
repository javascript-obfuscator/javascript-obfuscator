function foo() {
    if (true) {
        for (const key in {})
            console.log(key);
    } else {
        var bark = hawk();
    }
}