const defaultOptions = {
    name: '_0x([a-f0-9]){4}',
    kind: 'var'
}

/**
 * Returns string array RegExp
 *
 * @returns {RegExp}
 */
export function getStringArrayRegExp(
    stringArrayItems: string[],
    options: Partial<typeof defaultOptions> = {}
): RegExp {
    const mergedOptions = {
        ...defaultOptions,
        ...options
    };

    const {name, kind} = mergedOptions;

    return new RegExp(
        `function (${name}) *\\(\\) *{` +
            `${kind}.*= *\\[${stringArrayItems.map((item: string) => `\'${item}\'`).join(',')}];.*` +
            `return ${name}\\(\\); *` +
        '}'
    );
}