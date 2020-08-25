function foo () {
    var test = 'abc';

    var object = {
        [test]: 1
    };

    console.log(test);
    console.log(object.abc);
}