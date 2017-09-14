bar();

function foo () {

}

function bar () {

}

function baz () {
    function inner1 () {

    }

    if (true) {
        switch (true) {
            case true:
                while (true) {
                    inner1();
                }
        }
    }
}

baz();
foo();
