import { IBlockStatementNode } from "../../../src/interfaces/nodes/IBlockStatementNode";
import { ICustomNode } from "../../../src/interfaces/custom-nodes/ICustomNode";
import { IExpressionStatementNode } from "../../../src/interfaces/nodes/IExpressionStatementNode";
import { IFunctionDeclarationNode } from "../../../src/interfaces/nodes/IFunctionDeclarationNode";
import { IIdentifierNode } from "../../../src/interfaces/nodes/IIdentifierNode";
import { IProgramNode } from "../../../src/interfaces/nodes/IProgramNode";

import { DEFAULT_PRESET } from "../../../src/preset-options/DefaultPreset";

import { FunctionObfuscator } from "../../../src/node-obfuscators/FunctionObfuscator";
import { NodeMocks } from "../../mocks/NodeMocks";
import { Options } from "../../../src/Options";


const assert: Chai.AssertStatic = require('chai').assert;

describe('FunctionObfuscator', () => {
    describe('obfuscateNode (functionNode: IFunctionNode): void', () => {
        let blockStatementNode: IBlockStatementNode,
            expressionStatementNode1: IExpressionStatementNode,
            expressionStatementNode2: IExpressionStatementNode,
            functionObfuscator: FunctionObfuscator,
            functionDeclarationNode: IFunctionDeclarationNode,
            functionName: string = 'functionDeclaration',
            identifierName: string = 'identifierName',
            identifierNode1: IIdentifierNode,
            identifierNode2: IIdentifierNode,
            identifierNode3: IIdentifierNode,
            paramName: string = 'param1',
            programNode: IProgramNode;

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
