function foo () {

}

function bar () {
    function inner1 () {

    }

    function inner2 () {
        var inner3 = function () {
        };

        inner3();
    }

    inner2();
    inner1();
}

function baz () {
    var test = 1;
}

baz();
foo();
bar();