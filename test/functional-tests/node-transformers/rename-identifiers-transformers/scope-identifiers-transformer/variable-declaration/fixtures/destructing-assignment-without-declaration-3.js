(function () {
    var a, b;
    ({a, ...b} = {a: 1, b: 2});

    console.log(a, b);
})();
