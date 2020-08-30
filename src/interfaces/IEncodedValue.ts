import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';

export interface IEncodedValue {
    encoding: TStringArrayEncoding | null;
    encodedValue: string;
    decodeKey: string | null;
}
