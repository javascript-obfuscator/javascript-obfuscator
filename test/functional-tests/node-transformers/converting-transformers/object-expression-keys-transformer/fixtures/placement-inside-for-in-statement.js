(function(){
    var object = {};
    for (var i in object) {
        object = {bar: 'bar'};
    }
})();