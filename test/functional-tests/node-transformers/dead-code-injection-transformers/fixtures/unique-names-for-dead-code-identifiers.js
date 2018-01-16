(function(variable){
    function foo () {
        return variable.push(1);
    }

    function bar () {
        var variable = 1;
    }

    function baz() {
        var variable = 2;
    }

    function bark() {
        var variable = 3;
    }

    function hawk() {
        var variable = 4;
    }
})([]);