(function(){
    function foo (data) {
        function bar ({data, ...rest}) {
            return data + rest;
        }

        return data;
    }
})();