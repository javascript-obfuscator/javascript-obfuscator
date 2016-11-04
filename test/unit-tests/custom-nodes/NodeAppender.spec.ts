import * as chai from 'chai';
import * as ESTree from 'estree';

import { TStatement } from '../../../src/types/TStatement';

import { IStackTraceData } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceData';

import { NodeAppender } from '../../../src/NodeAppender';
import { NodeMocks } from '../../mocks/NodeMocks';
import { NodeUtils } from '../../../src/NodeUtils';
import { StackTraceAnalyzer } from '../../../src/stack-trace-analyzer/StackTraceAnalyzer';

const assert: any = chai.assert;

describe('NodeAppender', () => {
    describe('appendNode (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[]): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expectedBlockStatementNode: ESTree.BlockStatement,
            expectedExpressionStatementNode: ESTree.ExpressionStatement,
            expressionStatementNode: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode = NodeMocks.getExpressionStatementNode();
            expectedExpressionStatementNode = NodeMocks.getExpressionStatementNode();

            blockStatementNode = NodeMocks.getBlockStatementNode();

            expectedExpressionStatementNode['parentNode'] = blockStatementNode;

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expectedExpressionStatementNode
            ]);

            NodeAppender.appendNode(
                blockStatementNode,
                [expressionStatementNode]
            );
            NodeAppender.appendNode(
                blockStatementNode,
                <TStatement[]>[{}]
            );
        });

        it('should append given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });

    describe('appendNodeToOptimalBlockScope (blockScopeStackTraceData: IStackTraceData[], blockScopeNode: TNodeWithBlockStatement, nodeBodyStatements: TStatement[], index: number = 0): void', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: TStatement[],
            stackTraceData: IStackTraceData[];

        beforeEach(() => {
            node = NodeUtils.convertCodeToStructure(`
                var test = 1;
            `);
        });

        it('should append node into first and deepest function call in calls trace - variant #1', () => {
            astTree = NodeMocks.getProgramNode(
                <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                    function foo () {
                    
                    }
                    
                    function bar () {
                        function inner1 () {
                        
                        }
                    
                        function inner2 () {
                            var inner3 = function () {
                                
                            }
                            
                            inner3();
                        }
                        
                        inner2();
                        inner1();
                    }
                    
                    function baz () {
                    
                    }
                    
                    baz();
                    foo();
                    bar();
                `)
            );

            expectedAstTree = NodeMocks.getProgramNode(
                <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                    function foo () {
                    
                    }
                    
                    function bar () {
                        function inner1 () {
                        
                        }
                    
                        function inner2 () {
                            var inner3 = function () {
                            }
                            
                            inner3();
                        }
                        
                        inner2();
                        inner1();
                    }
                    
                    function baz () {
                        var test = 1;
                    }
                    
                    baz();
                    foo();
                    bar();
                `)
            );

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
            NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node);

            assert.deepEqual(astTree, expectedAstTree);
        });

        it('should append node into first and deepest function call in calls trace - variant #2', () => {
            astTree = NodeMocks.getProgramNode(
                <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                    function foo () {
                    
                    }
                    
                    function bar () {
                        function inner1 () {
                        
                        }
                    
                        function inner2 () {
                            var inner3 = function () {
                                
                            }
                            
                            inner3();
                        }
                        
                        inner2();
                        inner1();
                    }
                    
                    function baz () {
                    
                    }
                    
                    bar();
                    baz();
                    foo();
                `)
            );

            expectedAstTree = NodeMocks.getProgramNode(
                <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                    function foo () {
                    
                    }
                    
                    function bar () {
                        function inner1 () {
                        
                        }
                    
                        function inner2 () {
                            var inner3 = function () {
                                var test = 1;
                            }
                            
                            inner3();
                        }
                        
                        inner2();
                        inner1();
                    }
                    
                    function baz () {
                    
                    }
                    
                    bar();
                    baz();
                    foo();
                `)
            );

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
            NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node);

            assert.deepEqual(astTree, expectedAstTree);
        });

        describe('append by specific index', () => {
            let astTree: ESTree.Program;

            beforeEach(() => {
                astTree = NodeMocks.getProgramNode(
                    <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                        function foo () {
                        
                        }
                        
                        function bar () {
                            function inner1 () {
                            
                            }
                        
                            function inner2 () {
                                var inner3 = function () {
                                   
                                }
                                
                                inner3();
                            }
                            
                            inner2();
                            inner1();
                        }
                        
                        function baz () {
                        
                        }
                        
                        bar();
                        baz();
                        foo();
                    `)
                );
            });

            it('should append node into deepest function call by specified index in calls trace - variant #1', () => {
                expectedAstTree = NodeMocks.getProgramNode(
                    <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                        function foo () {
                            var test = 1;
                        }
                        
                        function bar () {
                            function inner1 () {
                            
                            }
                        
                            function inner2 () {
                                var inner3 = function () {
                                    
                                }
                                
                                inner3();
                            }
                            
                            inner2();
                            inner1();
                        }
                        
                        function baz () {
                        
                        }
                        
                        bar();
                        baz();
                        foo();
                    `)
                );

                stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
                NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node, 2);

                assert.deepEqual(astTree, expectedAstTree);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #2', () => {
                expectedAstTree = NodeMocks.getProgramNode(
                    <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                        function foo () {
                            
                        }
                        
                        function bar () {
                            function inner1 () {
                            
                            }
                        
                            function inner2 () {
                                var inner3 = function () {
                                    
                                }
                                
                                inner3();
                            }
                            
                            inner2();
                            inner1();
                        }
                        
                        function baz () {
                            var test = 1;
                        }
                        
                        bar();
                        baz();
                        foo();
                    `)
                );

                stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
                NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, astTree, node, 1);

                assert.deepEqual(astTree, expectedAstTree);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #3', () => {
                astTree = NodeMocks.getProgramNode(
                    <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                        var start = new Date();
                        var log = console.log;
                        
                        console.log = function () {};
                    
                        (function () {
                            function bar () {
                                function inner1 () {
                                
                                }
                            
                                function inner2 () {
                                    var inner3 = function () {
                                    
                                    }
                                    
                                    inner3();
                                }
                                
                                inner2();
                                inner1();
                            }
                            
                            bar();
                        })();
                        console.log = log;
                        console.log(new Date() - start);
                    `)
                );
                expectedAstTree = NodeMocks.getProgramNode(
                    <ESTree.Statement[]>NodeUtils.convertCodeToStructure(`
                        var start = new Date();
                        var log = console.log;
                        
                        console.log = function () {};
                    
                        (function () {
                            function bar () {
                                function inner1 () {
                                
                                }
                            
                                function inner2 () {
                                    var inner3 = function () {
                                        var test = 1;
                                    }
                                    
                                    inner3();
                                }
                                
                                inner2();
                                inner1();
                            }
                            
                            bar();
                        })();
                        console.log = log;
                        console.log(new Date() - start);
                    `)
                );

                stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
                NodeAppender.appendNodeToOptimalBlockScope(
                    stackTraceData,
                    astTree,
                    node,
                    NodeAppender.getRandomStackTraceIndex(stackTraceData.length)
                );

                assert.deepEqual(astTree, expectedAstTree);
            });
        });
    });

    describe('getRandomStackTraceIndex (stackTraceRootLength: number): number', () => {
        it('should returns random index between 0 and stack trace data root length', () => {
            let index: number;

            for (let i: number = 0; i < 100; i++) {
                index = NodeAppender.getRandomStackTraceIndex(100);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 100);
            }
        });
    });

    describe('insertNodeAtIndex (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[], index: number): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expectedBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode3: ESTree.ExpressionStatement,
            expressionStatementNode4: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(1));
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(3));
            expressionStatementNode4 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode3
            ]);

            expressionStatementNode1['parentNode'] = blockStatementNode;
            expressionStatementNode2['parentNode'] = blockStatementNode;
            expressionStatementNode3['parentNode'] = blockStatementNode;

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1,
                expressionStatementNode2,
                expressionStatementNode3
            ]);

            NodeAppender.insertNodeAtIndex(
                blockStatementNode,
                [expressionStatementNode4],
                1
            );
            NodeAppender.insertNodeAtIndex(
                blockStatementNode,
                <TStatement[]>[{}],
                1
            );
        });

        it('should insert given node in `BlockStatement` node body at index', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });

    describe('prependNode (blockScopeNode: TNodeWithBlockStatement[], nodeBodyStatements: TStatement[]): void', () => {
        let blockStatementNode: ESTree.BlockStatement,
            expectedBlockStatementNode: ESTree.BlockStatement,
            expressionStatementNode1: ESTree.ExpressionStatement,
            expressionStatementNode2: ESTree.ExpressionStatement,
            expressionStatementNode3: ESTree.ExpressionStatement;

        beforeEach(() => {
            expressionStatementNode1 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(1));
            expressionStatementNode2 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));
            expressionStatementNode3 = NodeMocks.getExpressionStatementNode(NodeMocks.getLiteralNode(2));

            blockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode1
            ]);

            expressionStatementNode1['parentNode'] = blockStatementNode;
            expressionStatementNode2['parentNode'] = blockStatementNode;

            expectedBlockStatementNode = NodeMocks.getBlockStatementNode([
                expressionStatementNode2,
                expressionStatementNode1
            ]);

            NodeAppender.prependNode(
                blockStatementNode,
                [Object.assign({}, expressionStatementNode3)]
            );
            NodeAppender.prependNode(
                blockStatementNode,
                <TStatement[]>[{}]
            )
        });

        it('should prepend given node to a `BlockStatement` node body', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });

        it('should does not change `BlockStatement` node body if given node is not a valid Node', () => {
            assert.deepEqual(blockStatementNode, expectedBlockStatementNode);
        });
    });
});
