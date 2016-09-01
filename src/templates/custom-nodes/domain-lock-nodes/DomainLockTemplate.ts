import { Utils } from "../../../Utils";

/**
 * @returns {string}
 */
export function DomainLockTemplate (): string {
    return `
        (function () {
          var domains = {domains}.replace(/[{diff}]/g, "").split(";");

          var evil = []["forEach"]["constructor"];
          var window = evil("return this")();
          for (var d in window)
            if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) break;
          for (var d1 in window[d])
            if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) break;

          var currentDomain = window[d][d1];

          var ok = false;
          for (var i = 0; i < domains.length; i++) {
            var domain = domains[i];
            if (currentDomain.endsWith(domain)) {
              if (currentDomain.length == domain.length || domain.startsWith("."))
                ok = true;
                break;
            }
          }
          if (!ok) {
            evil(${Utils.stringToUnicode(`throw new Error()`)})();
          }
        })();
    `;
}
