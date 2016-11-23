import { TNodeTransformer } from '../types/TNodeTransformer';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { INodeTransformersFactory } from '../interfaces/INodeTransformersFactory';
import { IOptions } from '../interfaces/IOptions';

import { NodeType } from '../enums/NodeType';

import { CatchClauseObfuscator } from './node-obfuscators/CatchClauseObfuscator';
import { FunctionDeclarationObfuscator } from './node-obfuscators/FunctionDeclarationObfuscator';
import { FunctionObfuscator } from './node-obfuscators/FunctionObfuscator';
import { LabeledStatementObfuscator } from './node-obfuscators/LabeledStatementObfuscator';
import { LiteralObfuscator } from './node-obfuscators/LiteralObfuscator';
import { MemberExpressionObfuscator } from './node-obfuscators/MemberExpressionObfuscator';
import { MethodDefinitionObfuscator } from './node-obfuscators/MethodDefinitionObfuscator';
import { ObjectExpressionObfuscator } from './node-obfuscators/ObjectExpressionObfuscator';
import { VariableDeclarationObfuscator } from './node-obfuscators/VariableDeclarationObfuscator';

export class NodeObfuscatorsFactory implements INodeTransformersFactory {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    private static readonly nodeObfuscators: Map <string, TNodeTransformer[]> = new Map <string, TNodeTransformer[]> ([
        [NodeType.ArrowFunctionExpression, [FunctionObfuscator]],
        [NodeType.ClassDeclaration, [FunctionDeclarationObfuscator]],
        [NodeType.CatchClause, [CatchClauseObfuscator]],
        [NodeType.FunctionDeclaration, [
            FunctionDeclarationObfuscator,
            FunctionObfuscator
        ]],
        [NodeType.FunctionExpression, [FunctionObfuscator]],
        [NodeType.MemberExpression, [MemberExpressionObfuscator]],
        [NodeType.MethodDefinition, [MethodDefinitionObfuscator]],
        [NodeType.ObjectExpression, [ObjectExpressionObfuscator]],
        [NodeType.VariableDeclaration, [VariableDeclarationObfuscator]],
        [NodeType.LabeledStatement, [LabeledStatementObfuscator]],
        [NodeType.Literal, [LiteralObfuscator]]
    ]);

    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected customNodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    /**
     * @param customNodes
     * @param options
     */
    constructor(customNodes: Map <string, ICustomNode>, options: IOptions) {
        this.customNodes = customNodes;
        this.options = options;
    }

    /**
     * @param nodeType
     * @returns {INodeTransformer[]}
     */
    public initializeNodeTransformers (nodeType: string): INodeTransformer[] {
        const nodeObfuscators: TNodeTransformer[] = NodeObfuscatorsFactory.nodeObfuscators.get(nodeType) || [];
        const instancesArray: INodeTransformer[] = [];

        nodeObfuscators.forEach((transformer: TNodeTransformer) => {
            instancesArray.push(
                new transformer(this.customNodes, this.options)
            );
        });

        return instancesArray;
    }
}
