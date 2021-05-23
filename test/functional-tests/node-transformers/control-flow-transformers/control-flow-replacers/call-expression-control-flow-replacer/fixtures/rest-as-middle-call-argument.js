(function () {
    const log = console.log;
    const first = 'foo';
    const rest = ['bar', 'baz', 'bark'];
    const last = 'hawk';
    log(first, ...rest, last);
})();