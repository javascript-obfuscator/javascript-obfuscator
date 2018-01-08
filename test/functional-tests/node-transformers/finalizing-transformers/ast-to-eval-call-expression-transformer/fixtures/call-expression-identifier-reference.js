(function(){
    function foo (bar) {
        eval('console.log(bar);');
    }

    foo(1);
})();