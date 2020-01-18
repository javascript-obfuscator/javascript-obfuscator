(function(){
    function foo ({id}) {
        console.log(id);

        function bar ({id: baz}) {
            return id +baz;
        }
    }
})();