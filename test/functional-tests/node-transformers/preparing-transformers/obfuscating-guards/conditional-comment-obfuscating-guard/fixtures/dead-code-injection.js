(function(){
    if (true) {
        var foo = function (a, b, c) {
            console.log('abc');
        };
        /* javascript-obfuscator:disable */
        var bar = function (a, b, c) {
            console.log('def');
        };
        var baz = function (a, b, c) {
            console.log('ghi');
        };
        /* javascript-obfuscator : enable */
        var bark = function (a, b, c) {
            console.log('jkl');
        };
        var hawk = function (a, b, c) {
            console.log('mno');
        };

        foo();
        bar();
        baz();
        bark();
        hawk();
    }
})();