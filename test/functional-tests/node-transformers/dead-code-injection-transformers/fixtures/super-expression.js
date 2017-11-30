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

        foo();
        bar();
        baz();
        bark();

        class Abstract {}

        class Concrete  extends Abstract {
            constructor () {
                super();
            }
        }
    }
})();