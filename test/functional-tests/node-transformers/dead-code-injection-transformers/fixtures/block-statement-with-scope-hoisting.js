(function(){
    function foo () {
        var a = 1;
        inner1();
        var b = 2;
        function inner1 () {}
        var c = 3;
    }
    function bar () {
        var a = 1;
        inner2();
        var b = 2;
        function inner2 () {}
        var c = 3;
    }
    function baz () {
        var a = 1;
        inner3();
        var b = 2;
        function inner3 () {}
        var c = 3;
    }
    function bark () {
        var a = 1;
        inner4();
        var b = 2;
        function inner4 () {}
        var c = 3;
    }
    function hawk () {
        var a = 1;
        inner5();
        var b = 2;
        function inner5 () {}
        var c = 3;
    }
})();