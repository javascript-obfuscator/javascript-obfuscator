import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';
import { IStringArrayStorageItemData } from '../../storages/string-array-storage/IStringArrayStorageItem';

export interface IStringArrayStorageAnalyzer extends IAnalyzer<void> {
    /**
     * @param {Program} astTree
     */
    analyze (astTree: ESTree.Program): void;

    /**
     * @param {Literal} literalNode
     * @returns {IStringArrayStorageItemData | undefined}
     */
    getItemDataForLiteralNode (literalNode: ESTree.Literal): IStringArrayStorageItemData | undefined;
}
