(function () {
    const log = console.log;
    const rest = ['foo', 'bar', 'baz'];
    const last = 'bark';
    log(...rest, last);
})();