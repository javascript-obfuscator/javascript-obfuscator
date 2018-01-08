(function(){
    function foo () {
        eval('console.log(\'bar\')');
    }

    foo();
})();