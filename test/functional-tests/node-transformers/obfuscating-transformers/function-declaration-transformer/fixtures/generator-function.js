(async function(){
    function* foo () {
        yield 1;
        yield 2;

        return 3;
    }

    let bar = foo();
})();