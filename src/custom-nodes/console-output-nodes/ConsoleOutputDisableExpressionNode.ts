import { INode } from "../../interfaces/nodes/INode";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { ConsoleOutputDisableExpressionTemplate } from "../../templates/custom-nodes/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate";

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
        return NodeUtils.convertCodeToStructure(
            ConsoleOutputDisableExpressionTemplate()
        );
    }
}
