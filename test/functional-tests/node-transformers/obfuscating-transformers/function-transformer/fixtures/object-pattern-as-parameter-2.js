(function(){
    function foo (data) {
        new Promise((resolve) => resolve({data: data}))
            .then(({data}) => console.log(data));
    }

    foo(1);
})();