import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';

import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractDeadCodeInjectionReplacer } from './AbstractDeadCodeInjectionReplacer';

@injectable()
export class IfStatementDeadCodeInjectionReplacer extends AbstractDeadCodeInjectionReplacer {
    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodeFactory, options);
    }

    /**
     * @param ifStatementNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public replace (ifStatementNode: ESTree.IfStatement, parentNode: ESTree.Node): ESTree.Node {
        return ifStatementNode;
    }
}
