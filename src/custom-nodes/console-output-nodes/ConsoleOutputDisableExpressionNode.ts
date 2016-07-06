import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";

export class ConsoleOutputDisableExpressionNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeUtils.prependNode(blockScopeNode.body, this.getNode());
    }

    /**
     *  JSCrush version of following code
     *
     *  (function () {
     *      var _console = []["filter"]["constructor"]("return this")().console;
     *      var _function = function () {};
     *
     *      _console.log = _function;
     *      _console.info = _function;
     *      _console.warn = _function;
     *      _console.error = _function;
     *  _console
     *  })();
     *
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        return NodeUtils.convertCodeToStructure(`
            (function () {
                var _ = '(\u0004\u0006\u0003\u0005[]' + '["filter"]["\u0007tructor"]' + '("return this")()' + '.' + '\u0003;\u0006\u0002\u0005\u0004};' + '_\u0003.log\u0001.in' + 'fo\u0001.' + 'war' + 'n\u0001.er' + 'r' + 'or\u0001})();' + '\u0001\u0005_\u0002;' + '_\u0003\u0002function' + '\u0003\u0007ole\u0004\u0002 ()' + '{\u0005 = \u0006var ' + '_\u0007cons', 
                    Y, 
                    $;
                
                for (Y in $ = "\u0007\u0006\u0005\u0004\u0003\u0002\u0001") {
                  var arr = _.split($[Y]);
                  _ = arr.join(arr.pop());
                }
                
                []["filter"]["constructor"](_)();
            })()
        `);
    }
}
