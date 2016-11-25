import * as ESTree from 'estree';

import { IOptions } from '../../../../src/interfaces/IOptions';

import { DEFAULT_PRESET } from '../../../../src/preset-options/DefaultPreset';

import { CustomNodesStorage } from '../../../../src/storages/custom-nodes/CustomNodesStorage';
import { FunctionDeclarationObfuscator } from '../../../../src/node-transformers/node-obfuscators/FunctionDeclarationObfuscator';
import { NodeMocks } from '../../../mocks/NodeMocks';
import { Options } from '../../../../src/options/Options';

const assert: Chai.AssertStatic = require('chai').assert;

describe('FunctionDeclarationObfuscator', () => {
    describe('changeControlFlow (functionDeclarationNode: IFunctionDeclarationNode, parentNode: INode): void', () => {
        let expressionStatementNode: ESTree.ExpressionStatement,
            functionDeclarationObfuscator: FunctionDeclarationObfuscator,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            functionName: string = 'functionDeclaration',
            programNode: ESTree.Program;

        beforeEach(() => {
            expressionStatementNode = NodeMocks.getExpressionStatementNode(
                NodeMocks.getCallExpressionNode(NodeMocks.getIdentifierNode(functionName))
            );

            const options: IOptions = new Options(DEFAULT_PRESET);

            functionDeclarationObfuscator = new FunctionDeclarationObfuscator(
                new CustomNodesStorage(options),
                options
            );

            functionDeclarationNode = NodeMocks.getFunctionDeclarationNode(
                functionName,
                NodeMocks.getBlockStatementNode()
            );
        });

        describe('if `functionDeclaration` node parent block scope is not a Program node', () => {
            let blockStatementNode: ESTree.BlockStatement,
                functionDeclarationParentNode: ESTree.FunctionDeclaration;

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

                functionDeclarationObfuscator.transformNode(
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

        describe('if `functionDeclaration` node parent block scope node is a Program node', () => {
            beforeEach(() => {
                programNode = NodeMocks.getProgramNode([
                    functionDeclarationNode
                ]);

                functionDeclarationNode['parentNode'] = programNode;
                expressionStatementNode['parentNode'] = programNode;

                functionDeclarationObfuscator.transformNode(
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
