(function() {
    let arr = [];
    let i = 0;
    while (i++ < 3)
        arr.push({value: 0});
    arr[0].value = 1;
    return arr[0] === arr[1];
})();
