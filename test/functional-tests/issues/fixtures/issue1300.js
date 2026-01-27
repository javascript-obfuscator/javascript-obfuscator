// Object inside for loop should create new object each iteration
(function() {
    let arr = [];
    for (let i = 0; i < 3; i++)
        arr.push({value: 0});
    arr[0].value = 1;
    return arr[0] === arr[1]; // should be false
})();
