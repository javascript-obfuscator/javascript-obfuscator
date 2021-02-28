(function () {
    const log = console.log;
    const first = 'foo';
    const rest = ['bar', 'baz', 'bark'];
    log(first, ...rest);
})();