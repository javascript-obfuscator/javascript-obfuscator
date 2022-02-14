(function(){
    if (true) {
        var foo = function () {
            return true;
        };
        var bar = function () {
            return true;
        };
        var baz = function () {
            return true;
        };
        var bark = function () {
            return true;
        };

        if (true) {
            eval('const eval = 1');
        }

        foo();
        bar();
        baz();
        bark();
    }
})();