(function(){
    var object = {
        foo: this.foo
    };

    this.bar = 'bar';
})();