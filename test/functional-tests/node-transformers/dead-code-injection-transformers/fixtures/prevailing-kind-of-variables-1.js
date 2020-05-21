function foo () {
    function bar () {
        const a = [];
        var b = [];
        while (true) {
            for (const a of b) {}
        }
        return a;
    }

    function baz () {
        var a = 1;
    }

    function bark () {
        var a = 1;
    }

    function hawk () {
        var a = 1;
    }
}