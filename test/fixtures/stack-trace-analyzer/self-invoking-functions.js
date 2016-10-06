(function foo (){
    (function bar (){
        baz();

        function baz () {

        }
    }());
})();