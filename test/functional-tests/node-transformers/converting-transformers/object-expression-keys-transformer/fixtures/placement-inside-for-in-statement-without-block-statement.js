(function(){
    var foo = {};
    for (var i in foo)
        foo = {bar: 'bar'};
})();