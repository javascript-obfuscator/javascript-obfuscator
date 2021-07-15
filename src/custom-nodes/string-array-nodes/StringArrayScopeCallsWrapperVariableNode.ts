import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayIndexNodeFactory } from '../../types/container/custom-nodes/string-array-index-nodes/TStringArrayIndexNodeFactory';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';

import { initializable } from '../../decorators/Initializable';

import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayScopeCallsWrapperVariableNode extends AbstractStringArrayCallNode {
    /**
     * @type {IStringArrayScopeCallsWrapperData}
     */
    @initializable()
    private stringArrayCallsWrapperData!: IStringArrayScopeCallsWrapperData;

    /**
     * @type {IStringArrayScopeCallsWrapperData}
     */
    @initializable()
    private stringArrayScopeCallsWrapperData!: IStringArrayScopeCallsWrapperData;


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
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
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
     * @param {IStringArrayScopeCallsWrapperData} stringArrayScopeCallsWrapperData
     * @param {IStringArrayScopeCallsWrapperData} stringArrayCallsWrapperData
     */
    public initialize (
        stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData,
        stringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData
    ): void {
        this.stringArrayScopeCallsWrapperData = stringArrayScopeCallsWrapperData;
        this.stringArrayCallsWrapperData = stringArrayCallsWrapperData;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(this.stringArrayScopeCallsWrapperData.name),
                    NodeFactory.identifierNode(this.stringArrayCallsWrapperData.name)
                )
            ],
            'const',
        );

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
