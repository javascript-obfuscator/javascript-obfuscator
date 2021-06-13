(function(){
    this.foo = 'foo';

    var object = {
        foo: this.foo
    };

    this.bar = 'bar';
})();