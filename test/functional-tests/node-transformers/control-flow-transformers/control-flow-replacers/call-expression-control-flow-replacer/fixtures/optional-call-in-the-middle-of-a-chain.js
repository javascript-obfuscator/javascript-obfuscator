(function () {
    var maybeHandler = undefined;
    var handler = function () {
        return ['a', 'b'];
    };

    maybeHandler?.(1).map(function (value) {
        return value;
    });

    var result = handler?.(1).map(function (value) {
        return value;
    }).join('');

    return result === 'ab' ? 'ok' : 'unexpected';
})();
