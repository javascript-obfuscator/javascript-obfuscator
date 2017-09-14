(function foo (){
    (function bar (){
        !function baz (){
            inner();

            function inner () {

            }
        }();
    }());
})();