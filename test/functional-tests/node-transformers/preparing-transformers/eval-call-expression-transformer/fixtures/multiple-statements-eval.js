(function(){
    function foo (bar, baz) {
        eval('bar;baz;');
    }

    foo(1, 2);
})();