if (true) {
    console.log('foo');
}

(function(){
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
    var hawk = function () {
        return true;
    };

    foo();
    bar();
    baz();
    bark();
    hawk();
})();