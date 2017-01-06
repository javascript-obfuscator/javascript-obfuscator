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
                    
                    return test;
                }
                
                console.log(test(1));
                
                function test2 (abc) {
                    function test1 () {
                      console.log('inside', abc.item);
                    }
                    
                    console.log('тест', abc);
                    
                    var abc = {};
                    
                    return abc.item = 15, test1();
                };
                
                var regexptest = /version\\/(\\d+)/i;
                console.log(regexptest);
                
                test2(22);
                console.log(105.4);
                console.log(true, false);
                
                var sA = 'shorthand1';
                var sB = 'shorthand2';
                
                console.log({sA, sB});
                
                function foo () {
                    return function () {
                        var sum1 = 10 + 20;
                        var sum2 = 20 + 30;
                        var sum3 = 30 + 50;
                        var sub = sum3 - sum2;
                        
                        return sum1 + sub;
                    }
                }
                
                try {
                } catch (error) {
                    console.log(error);
                }
                
                console.log(foo()());
                
                function bar () {
                    console.log(1);
                    console.log(2);
                    console.log(3);
                    console.log(4);
                    console.log(5);
                    console.log(6);
                    console.log(7);
                    console.log(8);
                }
                
                bar();
            })();
        `,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            disableConsoleOutput: false,
            stringArray: true,
            unicodeEscapeSequence: false
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
