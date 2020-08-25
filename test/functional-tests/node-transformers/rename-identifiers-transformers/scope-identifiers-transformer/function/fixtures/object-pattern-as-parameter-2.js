(function(){
    function foo (data) {
        new Promise((resolve) => resolve({data: data}))
            .then(({data}) => console.log(data));
        return data;
    }

    foo(1);
})();