const object = {
    foo: 1,
    bar: 2
};
class Class {
    baz = 1;
    static bark = 2;
    static hawk () {}
    static eagle () {}
}

var excluded1 = 'foo';
var excluded2 = 'baz';
var excluded3 = 'hawk';

console.log(object.foo, object['bar'], Class.baz, Class['bark'], Class.hawk, Class['eagle']);