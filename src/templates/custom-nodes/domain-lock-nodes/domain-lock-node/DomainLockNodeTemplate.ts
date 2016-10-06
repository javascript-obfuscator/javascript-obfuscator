/**
 * @returns {string}
 */
export function DomainLockNodeTemplate (): string {
    return `
        (function () {
            var regExp = new RegExp("[{diff}]", "g");
            var domains = "{domains}".replace(regExp, "").split(";");
            var eval = []["forEach"]["constructor"];
            var window = eval("return this")();
            
            for (var d in window) {
                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {
                    break;
                }
            }

            for (var d1 in window[d]) {
                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {
                    break;
                }
            }

            var currentDomain = window[d][d1];
            
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
                    
                    break;
                }
            }
                
            if (!ok) {
                eval('throw new Error("Unexpected identifier")')();
            }
        })();
    `;
}
