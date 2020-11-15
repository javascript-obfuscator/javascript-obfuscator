import { Utils } from '../../../utils/Utils';

export const StringArrayIndexesType: Readonly<{
    HexadecimalNumber: 'hexadecimal-number';
    HexadecimalNumericString: 'hexadecimal-numeric-string';
}> = Utils.makeEnum({
    HexadecimalNumber: 'hexadecimal-number',
    HexadecimalNumericString: 'hexadecimal-numeric-string'
});
