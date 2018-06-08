import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../types/container/custom-nodes/TCustomNodeFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayStorage } from '../../types/storages/TStringArrayStorage';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { CustomNode } from '../../enums/custom-nodes/CustomNode';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * String array transformer
 */
@injectable()
export class StringArrayTransformer extends AbstractNodeTransformer {
    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @type {TStringArrayStorage}
     */
    private readonly stringArrayStorage: TStringArrayStorage;

    /**
     * @param {TCustomNodeFactory} customNodeFactory
     * @param {TStringArrayStorage} stringArrayStorage
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.TStringArrayStorage) stringArrayStorage: TStringArrayStorage,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.customNodeFactory = customNodeFactory;
        this.stringArrayStorage = stringArrayStorage;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        if (!this.options.stringArray) {
            return null;
        }

        switch (transformationStage) {
            case TransformationStage.Finalizing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @returns {Node}
     */
    public transformNode (programNode: ESTree.Program, parentNode: ESTree.Node | null): ESTree.Node {
        if (!this.stringArrayStorage.getLength()) {
            return programNode;
        }

        const stringArrayNode: ICustomNode = this.customNodeFactory(CustomNode.StringArrayNode);
        const stringArrayCallsWrapperNode: ICustomNode = this.customNodeFactory(CustomNode.StringArrayCallsWrapperNode);
        const stringArrayRotateFunctionNode: ICustomNode = this.customNodeFactory(CustomNode.StringArrayRotateFunctionNode);

        const stringArrayStorageId: string = this.stringArrayStorage.getStorageId();
        const [stringArrayName, stringArrayCallsWrapperName]: string[] = stringArrayStorageId.split('|');
        const stringArrayRotateValue: number = this.options.rotateStringArray
            ? this.randomGenerator.getRandomInteger(100, 500)
            : 0;

        stringArrayNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
        stringArrayCallsWrapperNode.initialize(stringArrayName, stringArrayCallsWrapperName);

        const statements: TStatement[] = [
            ...stringArrayNode.getNode(),
            ...stringArrayCallsWrapperNode.getNode()
        ];

        if (this.options.rotateStringArray) {
            stringArrayRotateFunctionNode.initialize(stringArrayName, stringArrayRotateValue);
            statements.push(...stringArrayRotateFunctionNode.getNode());
        }

        NodeAppender.prepend(programNode, statements);

        return programNode;
    }
}
