(function(){
    function foo (a, b) {
        return eval('var c = a + b; eval(\'a + c\');');
    }

    return foo(1, 2);
})();