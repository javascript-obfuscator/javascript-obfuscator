(function(){
    var func = () => {};
    var object = {
        foo: 'bar',
        baz: `call${new func()}`
    };
})();