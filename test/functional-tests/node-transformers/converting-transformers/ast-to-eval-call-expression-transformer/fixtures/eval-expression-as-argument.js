(function(){
    function foo (bar) {
        console.log(eval('bar;'));
    }

    foo(1);
})();