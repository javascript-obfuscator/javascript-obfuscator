var start = new Date();
var log = console.log;

console.log = function () {};

(function () {
    function bar () {
        function inner1 () {

        }

        function inner2 () {
            var inner3 = function () {
                var test = 1;
            }

            inner3();
        }

        inner2();
        inner1();
    }

    bar();
})();
console.log = log;
console.log(new Date() - start);