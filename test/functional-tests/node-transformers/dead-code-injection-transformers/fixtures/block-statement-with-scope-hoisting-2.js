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
    function eagle () {
        var a = 1;
    }
})();