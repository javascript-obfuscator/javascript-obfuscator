(function() {
    let arr = [];
    let i = 0;
    do
        arr.push({value: 0});
    while (++i < 3);
    arr[0].value = 1;
    return arr[0] === arr[1];
})();
