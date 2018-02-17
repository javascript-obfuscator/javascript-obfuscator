(function(){
    function foo () {
        inner1();
        function inner1 () {}
    }
    function bar () {
        inner2();
        function inner2 () {}
    }
    function baz () {
        inner3();
        function inner3 () {}
    }
    function bark () {
        inner4();
        function inner4 () {}
    }
    function hawk () {
        inner5();
        function inner5 () {}
    }
})();