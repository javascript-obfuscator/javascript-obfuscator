import * as chai from 'chai';
import * as ESTree from 'estree';

import { IStackTraceData } from '../../../src/interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNodeAppender } from '../../../src/custom-nodes/CustomNodeAppender';
import { NodeUtils } from '../../../src/NodeUtils';
import { StackTraceAnalyzer } from '../../../src/stack-trace-analyzer/StackTraceAnalyzer';

const assert: any = chai.assert;

describe('CustomNodeAppender', () => {
    describe('appendNode (blockScopeNode: TNodeWithBlockStatement, node: ESTree.Node): void', () => {
        let astTree: ESTree.Program,
            expectedAstTree: ESTree.Program,
            node: ESTree.Node,
            stackTraceData: IStackTraceData[];

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

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
            CustomNodeAppender.appendNode(stackTraceData, astTree.body, node);

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

            stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
            CustomNodeAppender.appendNode(stackTraceData, astTree.body, node);

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

                stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
                CustomNodeAppender.appendNode(stackTraceData, astTree.body, node, 2);

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

                stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
                CustomNodeAppender.appendNode(stackTraceData, astTree.body, node, 1);

                NodeUtils.parentize(astTree);

                assert.deepEqual(astTree, expectedAstTree);
            });

            it('should append node into deepest function call by specified index in calls trace - variant #3', () => {
                astTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
                `, false);
                expectedAstTree = <ESTree.Program>NodeUtils.convertCodeToStructure(`
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
                `, false);

                stackTraceData = new StackTraceAnalyzer(astTree.body).analyze();
                CustomNodeAppender.appendNode(
                    stackTraceData,
                    astTree.body,
                    node,
                    CustomNodeAppender.getStackTraceIndexByThreshold(stackTraceData.length)
                );

                NodeUtils.parentize(astTree);

                assert.deepEqual(astTree, expectedAstTree);
            });
        });
    });

    describe('getIndexByThreshold (stackTraceRootLength: number, threshold: number = 0.1): number', () => {
        it('should returns random index between 0 and index based on threshold value', () => {
            let index: number;

            for (let i: number = 0; i < 10; i++) {
                index = CustomNodeAppender.getStackTraceIndexByThreshold(100, 0.1);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 10);
            }

            for (let i: number = 0; i < 10; i++) {
                index = CustomNodeAppender.getStackTraceIndexByThreshold(10, 0.5);

                assert.isAtLeast(index, 0);
                assert.isAtMost(index, 5);
            }

            for (let i: number = 0; i < 10; i++) {
                index = CustomNodeAppender.getStackTraceIndexByThreshold(1, 1);

                assert.equal(index, 0);
            }
        });
    });
});
