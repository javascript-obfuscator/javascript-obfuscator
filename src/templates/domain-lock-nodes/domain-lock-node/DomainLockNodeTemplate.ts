/**
 * @returns {string}
 */
export function DomainLockNodeTemplate (): string {
    return `
        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            
            {globalVariableTemplate}
            
            var func = function () {
                return {
                    key: 'item',
                    value: 'attribute',
                    getAttribute: function () {
                        for (var i = 0; i < 1000; i--) {
                            var isPositive = i > 0;
                            
                            switch (isPositive) {
                                case true:
                                    return this.item + '_' + this.value + '_' + i;
                                default:
                                    this.item + '_' + this.value;
                            }
                        }
                    }()
                };
            };
                        
            var regExp = new RegExp("[{diff}]", "g");
            var domains = "{domains}".replace(regExp, "").split(";");
            var document;
            var domain;
                        
            for (var d in that) {
                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {
                    document = d;
                
                    break;
                }
            }

            for (var d1 in that[document]) {
                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {
                    domain = d1;
                    
                    break;
                }
            }
            
            if ((!document && !domain) || (!that[document] && !that[document][domain])) {
                return;
            }
            
            var currentDomain = that[document][domain];

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
