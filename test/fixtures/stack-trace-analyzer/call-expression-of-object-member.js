var object = {
    foo: {
        baz: function () {

        }
    },

    bar: function () {
        function inner1 () {

        }

        inner1();
    }
};

object.foo.baz();
object['foo'].baz();
object.bar();
