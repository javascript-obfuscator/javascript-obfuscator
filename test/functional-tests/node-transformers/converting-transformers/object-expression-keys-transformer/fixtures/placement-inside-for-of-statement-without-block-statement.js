(function(){
    var foo = [];
    for (var i of foo)
        foo = {bar: 'bar'};
})();