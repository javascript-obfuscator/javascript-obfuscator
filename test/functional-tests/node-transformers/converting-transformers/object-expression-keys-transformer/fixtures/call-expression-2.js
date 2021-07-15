(function(){
    var func = () => {};
    var object = {
        foo: 'bar',
        baz: `call${func()}`
    };
})();