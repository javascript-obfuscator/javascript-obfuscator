(function () {
    var { bar: {baz: bark = 1} } = { bar: {baz: 2} };

    console.log(bar, baz, bark);
})();
