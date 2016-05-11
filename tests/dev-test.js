var JavaScriptObfuscator = require('../index.js');
var obfuscatedCode = JavaScriptObfuscator.obfuscate(`
   (function(){
        var result = 1,
            term1 = 0,
            term2 = 1,
            i = 1;
        while(i < 10)
        {
            var test = 10;
            result = term1 + term2;
            console.log(result);
            term1 = term2;
            term2 = result;
            i++;
        }

        console.log(test);
    })();
    `, {
    rotateUnicodeArray: false
});
console.log(obfuscatedCode);
console.log(eval(obfuscatedCode));
