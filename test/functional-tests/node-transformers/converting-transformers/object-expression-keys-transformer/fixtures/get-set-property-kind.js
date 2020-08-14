(function(){
    const foo = {
        bar: 1,
        get baz() { return 2; },
        set bark(value) { this.bark = value; }
    };
})();