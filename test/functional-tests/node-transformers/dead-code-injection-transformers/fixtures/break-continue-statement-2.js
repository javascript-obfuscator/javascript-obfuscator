(function(){
    if (true) {
        var foo = function () {
            console.log('abc');
        };
        var bar = function () {
            console.log('def');
        };
        var baz = function () {
            console.log('ghi');
        };
        var bark = function () {
            console.log('jkl');
        };

        for (var i = 0; i < 1; i++)
            continue;

        for (var i = 0; i < 1; i++)
            break;

        foo();
        bar();
        baz();
        bark();
    }
})();