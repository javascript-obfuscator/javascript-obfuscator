import { ICatchClauseNode } from "../../../src/interfaces/nodes/ICatchClauseNode";
import { ICustomNode } from "../../../src/interfaces/custom-nodes/ICustomNode";
import { IExpressionStatementNode } from "../../../src/interfaces/nodes/IExpressionStatementNode";

import { DEFAULT_PRESET } from "../../../src/preset-options/DefaultPreset";

import { NodeType } from "../../../src/enums/NodeType";

import { CatchClauseObfuscator } from '../../../src/node-obfuscators/CatchClauseObfuscator';
import { NodeMocks } from "../../mocks/NodeMocks";
import { Options } from "../../../src/options/Options";

const assert: Chai.AssertStatic = require('chai').assert;

describe('CatchClauseObfuscator', () => {
    describe('obfuscateNode (catchClauseNode: ICatchClauseNode): void', () => {
        let catchClauseObfuscator: CatchClauseObfuscator,
            catchClauseNode: ICatchClauseNode;

        beforeEach(() => {
            let expressionStatementNode: IExpressionStatementNode = {
                type: NodeType.ExpressionStatement,
                expression: {
                    type: NodeType.CallExpression,
                    callee: {
                        type: NodeType.MemberExpression,
                        computed: false,
                        object: {
                            type: NodeType.Identifier,
                            name: 'console'
                        },
                        property: {
                            type: NodeType.Identifier,
                            name: 'log'
                        }
                    },
                    arguments: [
                        {
                            type: NodeType.Identifier,
                            'name': 'err'
                        }
                    ]
                }
            };

            catchClauseObfuscator = new CatchClauseObfuscator(
                new Map<string, ICustomNode>(),
                new Options(DEFAULT_PRESET)
            );

            catchClauseNode = NodeMocks.getCatchClauseNode([
                expressionStatementNode
            ]);

            catchClauseObfuscator.obfuscateNode(catchClauseNode);
        });

        it('should obfuscate catch clause param name', () => {
            assert.match(
                (<any>catchClauseNode.body.body[0]).expression.arguments[0].name,
                /^_0x\w+$/
            );
        });

        it('should obfuscate catch clause param calls in catch clause node body', () => {
            assert.match(
                catchClauseNode.param.name,
                /^_0x\w+$/
            );
        });
    });
});
