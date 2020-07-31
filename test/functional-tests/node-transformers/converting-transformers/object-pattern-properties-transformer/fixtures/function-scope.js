(function () {
    const {foo, bar, ...rest} = {};
    console.log(foo, bar, rest);
})();