/**
 * @param str
 * @param regExp
 * @param index
 * @return {string}
 */
export function getRegExpMatch (str: string, regExp: RegExp, index: number = 1): string {
    const match: RegExpMatchArray | null = str.match(regExp);

    if (!match) {
        throw new Error(`No matches were found for regular expression \`${regExp.toString()}\``);
    }

    return (<RegExpMatchArray>match)[index];
}
