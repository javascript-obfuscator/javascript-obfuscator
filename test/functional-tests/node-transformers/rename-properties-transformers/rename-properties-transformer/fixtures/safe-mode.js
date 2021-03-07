const object = {
    foo: 1,
    bar: 2
};
class Class {
    static baz () {}
    static bark () {}
}

var excluded1 = 'foo';
var excluded2 = 'baz';

console.log(object.foo, object['bar'], Class.baz, Class['bark']);