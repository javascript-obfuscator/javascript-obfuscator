import { inject, injectable } from 'inversify';

import * as ESTree from 'estree';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { AbstractStringArrayIndexNode } from './AbstractStringArrayIndexNode';
import { NodeFactory } from '../../../node/NodeFactory';
import { NumberUtils } from '../../../utils/NumberUtils';

@injectable()
export class StringArrayHexadecimalNumberIndexNode extends AbstractStringArrayIndexNode {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {number} index
     * @returns {Expression}
     */
    public getNode (index: number): ESTree.Expression {
        const hexadecimalIndex: string = NumberUtils.toHex(index);

        return NodeFactory.literalNode(index, hexadecimalIndex);
    }
}
