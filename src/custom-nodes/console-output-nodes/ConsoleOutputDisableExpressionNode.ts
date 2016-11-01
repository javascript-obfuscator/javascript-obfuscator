import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { TStatement } from '../../types/TStatement';

import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

import { ConsoleOutputDisableExpressionTemplate } from '../../templates/custom-nodes/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { CustomNodeAppender } from '../CustomNodeAppender';
import { NodeUtils } from '../../NodeUtils';
import { Utils } from '../../Utils';

export class ConsoleOutputDisableExpressionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        CustomNodeAppender.appendNode(
            stackTraceData,
            blockScopeNode,
            this.getNode(),
            CustomNodeAppender.getRandomStackTraceIndex(stackTraceData.length)
        );
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
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            ConsoleOutputDisableExpressionTemplate().formatUnicorn({
                consoleLogDisableFunctionName: Utils.getRandomVariableName()
            })
        );
    }
}
