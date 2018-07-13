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
            var location;
            var hostname;

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

            if (!("~" > domain)) {
                for (var d2 in that[document]) {
                    if (d2.length == 8 && d2.charCodeAt(7) == 110 && d2.charCodeAt(0) == 108) {
                        location = d2;
                        
                        break;
                    }
                }

                for (var d3 in that[document][location]) {
                    if (d3.length == 8 && d3.charCodeAt(7) == 101 && d3.charCodeAt(0) == 104) {
                        hostname = d3;
                        
                        break;
                    }
                }
            }
            
            if (!document || !that[document]) {
                return;
            }
            
            var documentDomain = that[document][domain];
            var documentLocationHostName = !!that[document][location] && that[document][location][hostname];
            var currentDomain = documentDomain || documentLocationHostName;
          
            if (!currentDomain) {
                return;
            }
          
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
