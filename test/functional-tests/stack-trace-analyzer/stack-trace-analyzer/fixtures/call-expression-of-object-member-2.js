var object = {
    foo: {
        bar: function () {

        },
    },
    1: {
        baz: function () {

        },
    }
};


var object1 = {
    foo: {
        1: function () {

        }
    }
};

var foo = 'foo';

object[foo].bar();
object[1].baz();

object1['foo'][1]();