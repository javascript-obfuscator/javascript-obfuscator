(function(){
    class Test1 {
        foo () {
            var that = this;

            console.log(that.foo);
        }
    }

    class Test2 {
        bar () {
            var that = this;

            console.log(that.bar);
        }
    }

    class Test3 {
        baz () {
            var that = this;

            console.log(that.baz);
        }
    }

    console.log(new Test1().foo());
    console.log(new Test2().bar());
    console.log(new Test3().baz());
})();