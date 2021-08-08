import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import type * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayIndexNodeFactory } from '../../types/container/custom-nodes/string-array-index-nodes/TStringArrayIndexNodeFactory';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';

import { initializable } from '../../decorators/Initializable';

import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
import { NodeFactory } from '../../node/NodeFactory';

@injectable()
export class StringArrayIndexHostNode extends AbstractStringArrayCallNode {
    /**
     * @type {Literal}
     */
    @initializable()
    private stringArrayCallIndexNode!: ESTree.Literal;

    /**
     * @type {number}
     */
    @initializable()
    private variableName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {TStringArrayIndexNodeFactory} stringArrayIndexNodeFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.Factory__IStringArrayIndexNode)
            stringArrayIndexNodeFactory: TStringArrayIndexNodeFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            stringArrayIndexNodeFactory,
            customCodeHelperFormatter,
            stringArrayStorage,
            arrayUtils,
            randomGenerator,
            options
        );
    }

    /**
     * @param {Literal} stringArrayCallIndexNode
     * @param {string} variableName
     */
    public initialize (
        stringArrayCallIndexNode: ESTree.Literal,
        variableName: string
    ): void {
        this.stringArrayCallIndexNode = stringArrayCallIndexNode;
        this.variableName = variableName;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const indexHostVariableNode: ESTree.VariableDeclaration = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(this.variableName),
                    this.stringArrayCallIndexNode
                )
            ],
            'const'
        );

        return [indexHostVariableNode];
    }
}
