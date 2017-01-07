function foo () {
    function bar () {
        console.log(abc.item);
    }

    console.log(abc);

    var abc = {};

    abc.item = 15;
    bar();
}