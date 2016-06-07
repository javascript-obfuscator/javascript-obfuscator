"use strict";

var JavaScriptObfuscator_1 = require('../src/JavaScriptObfuscator');
var obfuscatedCode = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate("\n    (function(){\n        var result = 1,\n            term1 = 0,\n            term2 = 1,\n            i = 1;\n        while(i < 10)\n        {\n            var test = 10;\n            result = term1 + term2;\n            console.log(result);\n            term1 = term2;\n            term2 = result;\n            i++;\n        }\n\n        console.log(test);\n        \n        var test = function (test) {\n            console.log(test);\n            \n            if (true) {\n                var test = 5\n            }\n            \n            return test;\n        }\n        \n        console.log(test(1));\n        \n        function test2 (abc) {\n            function test1 () {\n              console.log('inside', abc.item);\n            }\n            \n            console.log('тест', abc);\n            \n            var abc = {};\n            \n            return abc.item = 15, test1();\n        };\n        \n        test2(22);\n        console.log(105.4);\n        console.log(true, false);\n    })();\n    ", {
    disableConsoleOutput: false,
    encodeUnicodeLiterals: true
});
console.log(obfuscatedCode);
console.log(eval(obfuscatedCode));
