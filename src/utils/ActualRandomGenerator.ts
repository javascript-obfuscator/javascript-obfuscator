import { alphabetString } from '../constants/AlphabetString';
import { alphabetStringUppercase } from '../constants/AlphabetStringUppercase';

interface IStringOptions {
    length: number;
}


class ActualRandomGenerator {
    public string ({ length }: IStringOptions): string{
        let result           = '';
        const characters       = `${alphabetString}${alphabetStringUppercase}`;
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    public n <T>(f: () => T, count: number): T[] {
        return Array.from(Array(count)).map(f);
    }

    public pickone<T> (arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

export { ActualRandomGenerator };
