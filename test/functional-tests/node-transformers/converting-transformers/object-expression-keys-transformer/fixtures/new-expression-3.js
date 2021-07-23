(function(){
    var func = () => {};
    var object = {
        foo: 'bar',
        baz: {
            bark: new func()
        }
    };
})();