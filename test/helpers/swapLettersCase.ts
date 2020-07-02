/**
 * @param {string} value
 * @returns {string}
 */
export function swapLettersCase (value: string): string {
    return value
        .split('')
        .map((letter: string) =>
            letter === letter.toUpperCase()
                ? letter.toLowerCase()
                : letter.toUpperCase()
        )
        .join('');
}
