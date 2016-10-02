bar();

function foo () {

}

function bar () {

}

function baz () {
    function inner1 () {

    }

    inner1();
}

baz();
foo();
