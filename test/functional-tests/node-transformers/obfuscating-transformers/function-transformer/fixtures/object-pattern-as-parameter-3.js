(function(){
    function foo (data, options) {
        function bar ({data, ...rest}) {
            function baz ({options}) {
                return data + options + rest;
            }
        }

        return data;
    }
})();