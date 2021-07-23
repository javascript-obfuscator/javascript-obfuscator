(function(){
    var func = () => {};
    var object = {
        foo: 'bar',
        baz: new func()
    };
})();