'use strict';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

(function () {
    const JavaScriptObfuscator: any = require("../../index");

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
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
        
        var test = function (test) {
            console.log(test);
            
            if (true) {
                var test = 5
            }
        }
        
        function t () {
            return function () {
                return 100 * 2 - 70;
            }
        }
        
        var n = 100 + 50;
        var b = true + true;
        var s = 'str' + 'ing';
        var r = /re/ + /g/;
        
        console.log(t()());
        console.log(n);
    })();
    `,
        {
            controlFlow: true,
            disableConsoleOutput: false,
            selfDefending: true,
            stringArrayEncoding: 'rc4'
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
