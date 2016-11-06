/**
 * @returns {string}
 */
export function DomainLockNodeTemplate (): string {
    return `
        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            var getGlobal = Function('return typeof self !== "undefined"' + ' ? self : ' + 'typeof window !== "undefined"' + ' ? window : ' + 'typeof global !== "undefined"' + ' ? global : ' + '[]["filter"]["constructor"]("return this")()');
            
            var func = function () { 
                return {
                    key: 'item',
                    value: 'attribute',
                    getAttribute: function () {
                        getGlobal()['eval']('while(true){}')();
                    }()
                };
            };
                        
            var regExp = new RegExp("[{diff}]", "g");
            var domains = "{domains}".replace(regExp, "").split(";");
            var eval = []["forEach"]["constructor"];
            var windowObject = eval("return this")();
            var document;
            var domain;
                        
            for (var d in windowObject) {
                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {
                    document = d;
                
                    break;
                }
            }

            for (var d1 in windowObject[document]) {
                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {
                    domain = d1;
                    
                    break;
                }
            }
            
            if ((!document && !domain) || (!windowObject[document] && !windowObject[document][domain])) {
                return;
            }
            
            var currentDomain = windowObject[document][domain];

            var ok = false;
                        
            for (var i = 0; i < domains.length; i++) {
                var domain = domains[i];
                var position = currentDomain.length - domain.length;
                var lastIndex = currentDomain.indexOf(domain, position);
                var endsWith = lastIndex !== -1 && lastIndex === position;
                
                if (endsWith) {
                    if (currentDomain.length == domain.length || domain.indexOf(".") === 0) {
                        ok = true;
                    }
                    
                    break;
                }
            }
               
            if (!ok) {
                data;
            } else {
                return;
            }
            
            func();
        });

        {domainLockFunctionName}();
    `;
}
