(function () {
    var a = 'a', b = 'b', c;
    ({[a]: a, [b]: b} = {a: 1, b: 2});
    c = 3;

    console.log(a, b, c);
})();
