import * as ESTree from 'estree';

import { ICustomNode } from '../../../src/interfaces/custom-nodes/ICustomNode';

import { DEFAULT_PRESET } from '../../../src/preset-options/DefaultPreset';

import { FunctionObfuscator } from '../../../src/node-obfuscators/FunctionObfuscator';
import { NodeMocks } from '../../mocks/NodeMocks';
import { Options } from '../../../src/options/Options';


const assert: Chai.AssertStatic = require('chai').assert;

describe('FunctionObfuscator', () => {
    describe('obfuscateNode (functionNode: IFunctionNode): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            functionObfuscator: FunctionObfuscator,
            functionDeclarationNode: ESTree.FunctionDeclaration,
            functionName: string = 'functionDeclaration',
            identifierName: string = 'identifierName',
            identifierNode1: ESTree.Identifier,
            identifierNode2: ESTree.Identifier,
            identifierNode3: ESTree.Identifier,
            paramName: string = 'param1',
            programNode: ESTree.Program;

        before(() => {
            identifierNode1 = NodeMocks.getIdentifierNode(paramName);
            identifierNode2 = NodeMocks.getIdentifierNode(paramName);
            identifierNode3 = NodeMocks.getIdentifierNode(identifierName);

            expressionStatementNode1 = NodeMocks.getExpressionStatementNode(
                NodeMocks.getCallExpressionNode(identifierNode2)
            );

            expressionStatementNode2 = NodeMocks.getExpressionStatementNode(
                NodeMocks.getCallExpressionNode(identifierNode3)
            );

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1
            ]);

            functionDeclarationNode = NodeMocks.getFunctionDeclarationNode(
                functionName,
                blockStatementNode,
                [
                    identifierNode1
                ]
            );

            programNode = NodeMocks.getProgramNode([
                functionDeclarationNode
            ]);

            programNode['parentNode'] = programNode;
            functionDeclarationNode['parentNode'] = programNode;
            blockStatementNode['parentNode'] = functionDeclarationNode;
            identifierNode1['parentNode'] = functionDeclarationNode;
            expressionStatementNode1['parentNode'] = blockStatementNode;

            functionObfuscator = new FunctionObfuscator(
                new Map<string, ICustomNode>(),
                new Options(DEFAULT_PRESET)
            );

            functionObfuscator.obfuscateNode(functionDeclarationNode);
        });

        it('should obfuscate function parameter', () => {
            assert.match(identifierNode1.name, /^_0x\w+$/);
        });

        it('should obfuscate function parameter in function body', () => {
            assert.match(identifierNode2.name, /^_0x\w+$/);
            assert.equal(identifierNode2.name, identifierNode1.name);
        });

        it('shouldn\'t obfuscate other identifiers in function body', () => {
            assert.equal(identifierNode3.name, identifierName);
        });
    });
});
