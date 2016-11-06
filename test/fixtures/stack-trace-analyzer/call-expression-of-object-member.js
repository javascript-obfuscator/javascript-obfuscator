var object = {
    foo: {
        baz: function () {

        }
    },

    bar: function () {
        function inner () {

        }

        inner();
    }
};

var object1 = {
    foo: {
        baz: function () {

        },

        func: function () {

        }
    },

    'bar': function () {
        function inner1 () {

        }

        inner1();
    }
};

object1.foo.baz();
object1['foo'].baz();
object1['foo'].func();
object1.bar();

object.bar();
