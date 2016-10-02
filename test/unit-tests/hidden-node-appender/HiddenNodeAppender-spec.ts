import * as chai from 'chai';
import * as ESTree from 'estree';

import { HiddenNodeAppender } from '../../../src/hidden-node-appender/HiddenNodeAppender';
import { NodeUtils } from '../../../src/NodeUtils';

const assert: any = chai.assert;

describe('ASTTreeBlockScopeAnalyzer', () => {
    describe('appendNode (blockScopeNode: TNodeWithBlockStatement, node: ESTree.Node): void', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: ESTree.Node;

        beforeEach(() => {
            node = NodeUtils.convertCodeToStructure(`
                var test = 1;
            `);
        });

        it('should append node into first and deepest function call in calls trace - variant #1', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
            `, false);

            expectedAstTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
            `, false);

            HiddenNodeAppender.appendNode(astTree.body, node);

            NodeUtils.parentize(astTree);

            assert.deepEqual(astTree, expectedAstTree);
        });

        it('should append node into first and deepest function call in calls trace - variant #2', () => {
            astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
            `, false);

            expectedAstTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
            `, false);

            HiddenNodeAppender.appendNode(astTree.body, node);

            NodeUtils.parentize(astTree);

            assert.deepEqual(astTree, expectedAstTree);
        });

        describe('append by specific index', () => {
            let astTree: ESTree.Program;

            beforeEach(() => {
                astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
                `, false);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #1', () => {
                expectedAstTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
                `, false);

                HiddenNodeAppender.appendNode(astTree.body, node, 2);

                NodeUtils.parentize(astTree);

                assert.deepEqual(astTree, expectedAstTree);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #2', () => {
                expectedAstTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
                `, false);

                HiddenNodeAppender.appendNode(astTree.body, node, 1);

                NodeUtils.parentize(astTree);

                assert.deepEqual(astTree, expectedAstTree);
            });
        });
    });

    describe('getIndexByThreshold (blockStatementBodyLength: number, threshold: number = 0.1): number', () => {
        it('should returns random index between 0 and index based on threshold value', () => {
            let index: number;

            for (let i = 0; i < 10; i++) {
                index = HiddenNodeAppender.getIndexByThreshold(100, 0.1);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 10);
            }

            for (let i = 0; i < 10; i++) {
                index = HiddenNodeAppender.getIndexByThreshold(10, 0.5);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 5);
            }

            for (let i = 0; i < 10; i++) {
                index = HiddenNodeAppender.getIndexByThreshold(1, 1);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 1);
            }
        });
    });
});
