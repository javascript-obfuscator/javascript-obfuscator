var obj1={
    firstname:'John',
    lastname:'Smith'
};
var obj2={
    age:40,
    country:'USA'
}
var user={...obj1, ...obj2}
console.log(user);