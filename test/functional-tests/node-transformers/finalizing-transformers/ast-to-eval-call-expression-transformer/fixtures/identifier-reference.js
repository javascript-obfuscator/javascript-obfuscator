(function(){
    function foo (bar) {
        eval('bar');
    }

    foo(1);
})();