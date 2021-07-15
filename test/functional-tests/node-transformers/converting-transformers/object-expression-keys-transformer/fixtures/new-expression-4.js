(function(){
    var func = () => {};
    var object = {
        foo: 'bar',
        baz: {
            bark: 'hawk'
        },
        eagle: new func()
    };
})();