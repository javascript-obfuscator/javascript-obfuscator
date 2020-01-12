/**
 * @param str
 * @param regExp
 * @param matchIndex
 * @return {string}
 */
export function getRegExpMatch (str: string, regExp: RegExp, matchIndex: number = 0): string {
    const match: RegExpMatchArray | null = str.match(regExp);

    if (!match) {
        throw new Error(`No matches were found. String: \`${str}\`, regular expression: \`${regExp.toString()}\``);
    }

    return (<RegExpMatchArray>match)[matchIndex + 1];
}
