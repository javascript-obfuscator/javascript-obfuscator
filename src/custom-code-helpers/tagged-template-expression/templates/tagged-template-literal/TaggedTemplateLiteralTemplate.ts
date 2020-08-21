/**
 * @returns {string}
 */
export function TaggedTemplateLiteralTemplate (): string {
    return `
        function {taggedTemplateLiteralHelperName} (strings, raw) {
            if (!raw || !raw.length) {
                raw = strings.slice(0);
            }
            
            return Object.freeze(Object.defineProperties(strings, {
                raw: {
                    value: Object.freeze(raw)
                }
            }));
        }
    `;
}
