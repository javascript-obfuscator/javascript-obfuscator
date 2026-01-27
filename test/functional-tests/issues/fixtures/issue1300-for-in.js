(function() {
    let arr = [];
    let obj = {a: 1, b: 2, c: 3};
    for (let key in obj)
        arr.push({value: 0});
    arr[0].value = 1;
    return arr[0] === arr[1];
})();
