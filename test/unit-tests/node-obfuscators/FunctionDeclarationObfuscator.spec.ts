import { IBlockStatementNode } from "../../../src/interfaces/nodes/IBlockStatementNode";
import { ICustomNode } from "../../../src/interfaces/custom-nodes/ICustomNode";
import { IExpressionStatementNode } from "../../../src/interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../../../src/interfaces/nodes/IFunctionDeclarationNode";
import { IProgramNode } from "../../../src/interfaces/nodes/IProgramNode";

import { DEFAULT_PRESET } from "../../../src/preset-options/DefaultPreset";

import { FunctionDeclarationObfuscator } from '../../../src/node-obfuscators/FunctionDeclarationObfuscator';
import { NodeMocks } from "../../mocks/NodeMocks";
import { Options } from "../../../src/options/Options";

const assert: Chai.AssertStatic = require('chai').assert;

describe('FunctionDeclarationObfuscator', () => {
    describe('obfuscateNode (functionDeclarationNode: IFunctionDeclarationNode, parentNode: INode): void', () => {
        let expressionStatementNode: IExpressionStatementNode,
            functionDeclarationObfuscator: FunctionDeclarationObfuscator,
            functionDeclarationNode: IFunctionDeclarationNode,
            functionName: string = 'functionDeclaration',
            programNode: IProgramNode;

        beforeEach(() => {
            expressionStatementNode = NodeMocks.getExpressionStatementNode(
                NodeMocks.getCallExpressionNode(NodeMocks.getIdentifierNode(functionName))
            );

            functionDeclarationObfuscator = new FunctionDeclarationObfuscator(
                new Map<string, ICustomNode>(),
                new Options(DEFAULT_PRESET)
            );

            functionDeclarationNode = NodeMocks.getFunctionDeclarationNode(
                functionName,
                NodeMocks.getBlockStatementNode()
            );
        });

        describe('if `functionDeclaration` node parent node is not a Program node', () => {
            let blockStatementNode: IBlockStatementNode,
                functionDeclarationParentNode: IFunctionDeclarationNode;

            beforeEach(() => {
                blockStatementNode = NodeMocks.getBlockStatementNode([
                    functionDeclarationNode,
                    expressionStatementNode
                ]);

                functionDeclarationParentNode = NodeMocks.getFunctionDeclarationNode(
                    'functionDeclarationParentNode',
                    blockStatementNode
                );

                programNode = NodeMocks.getProgramNode([
                    functionDeclarationParentNode
                ]);

                programNode['parentNode'] = programNode;
                functionDeclarationParentNode['parentNode'] = programNode;
                blockStatementNode['parentNode'] = functionDeclarationParentNode;
                functionDeclarationNode['parentNode'] = blockStatementNode;
                expressionStatementNode['parentNode'] = blockStatementNode;

                functionDeclarationObfuscator.obfuscateNode(
                    functionDeclarationNode,
                    blockStatementNode
                );
            });

            it('should obfuscate function name', () => {
                assert.match(functionDeclarationNode.id.name, /^_0x\w+$/);
            });

            it('should obfuscate function name inside `functionDeclaration` parent scope', () => {
                assert.match((<any>expressionStatementNode).expression.callee.name, /^_0x\w+$/);
            });
        });

        describe('if `functionDeclaration` node parent node is a Program node', () => {
            beforeEach(() => {
                programNode = NodeMocks.getProgramNode([
                    functionDeclarationNode
                ]);

                functionDeclarationNode['parentNode'] = programNode;
                expressionStatementNode['parentNode'] = programNode;

                functionDeclarationObfuscator.obfuscateNode(
                    functionDeclarationNode,
                    programNode
                );
            });

            it('shouldn\'t obfuscate function name inside `programNode` scope', () => {
                assert.equal(functionDeclarationNode.id.name, functionName);
            });

            it('should\'t obfuscate function name in `functionDeclaration` calls inside `programNode`', () => {
                assert.equal((<any>expressionStatementNode).expression.callee.name, functionName);
            });
        });
    });
});
