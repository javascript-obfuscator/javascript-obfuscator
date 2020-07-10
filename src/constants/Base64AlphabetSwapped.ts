import { alphabetStringUppercase } from './AlphabetStringUppercase';
import { alphabetString } from './AlphabetString';
import { numbersString } from './NumbersString';

/**
 * Swapped lowercase and uppercase groups of alphabet to prevent easy decode
 */
export const base64alphabetSwapped: string = `${alphabetString}${alphabetStringUppercase}${numbersString}+/=`;
