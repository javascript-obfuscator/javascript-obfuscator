(function() {
    let arr = [];
    for (let x of [1, 2, 3])
        arr.push({value: 0});
    arr[0].value = 1;
    return arr[0] === arr[1];
})();
