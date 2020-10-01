(async function(){
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

        if (true) {
            for await (const item of []) {}
        }

        foo();
        bar();
        baz();
        bark();
    }
})();