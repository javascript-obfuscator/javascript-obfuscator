import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';

export interface IEncodedValue {
    encoding: TStringArrayEncoding;
    encodedValue: string;
    decodeKey: string | null;
}
