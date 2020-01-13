import { IEncodedValue } from '../../IEncodedValue';

export interface IStringArrayStorageItemData extends IEncodedValue {
    index: number;
    value: string;
}
