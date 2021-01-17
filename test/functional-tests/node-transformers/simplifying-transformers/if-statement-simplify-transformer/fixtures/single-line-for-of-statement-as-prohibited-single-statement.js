function foo() {
    if (true) {
        for (const item of [])
            console.log(item);
    } else {
        var bark = hawk();
    }
}