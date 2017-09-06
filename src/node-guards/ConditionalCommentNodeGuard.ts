import { injectable } from 'inversify';

import * as ESTree from 'estree';

import { INodeGuard } from '../interfaces/node-guards/INodeGuard';

@injectable()
export class ConditionalCommentNodeGuard implements INodeGuard {
    /**
     * @type {RegExp}
     */
    private static readonly obfuscationEnableCommentRegExp: RegExp = new RegExp('javascript-obfuscator *: *enable');

    /**
     * @type {RegExp}
     */
    private static readonly obfuscationDisableCommentRegExp: RegExp = new RegExp('javascript-obfuscator *: *disable');

    /**
     * @type {boolean}
     */
    private obfuscationEnabledForCurrentNode: boolean = true;

    /**
     * @type {boolean}
     */
    private obfuscationEnabledForNextNode: boolean | null = null;

    /**
     * @returns {boolean}
     * @param node
     */
    public check (node: ESTree.Node): boolean {
        if (this.obfuscationEnabledForNextNode) {
            this.obfuscationEnabledForCurrentNode = this.obfuscationEnabledForNextNode;
            this.obfuscationEnabledForNextNode = null;
        }

        if (!node.leadingComments && !node.trailingComments) {
            return this.obfuscationEnabledForCurrentNode;
        }

        const leadingComments: ESTree.Comment[] | undefined = node.leadingComments;
        const trailingComments: ESTree.Comment[] | undefined = node.trailingComments;

        if (leadingComments) {
            this.obfuscationEnabledForCurrentNode = this.checkComments(leadingComments);
        }

        if (trailingComments) {
            this.obfuscationEnabledForNextNode = this.checkComments(trailingComments);
        }

        return this.obfuscationEnabledForCurrentNode;
    }

    /**
     * @param {Comment[]} comments
     * @returns {boolean}
     */
    private checkComments (comments: ESTree.Comment[]): boolean {
        const commentsLength: number = comments.length;

        let obfuscationEnabled: boolean = this.obfuscationEnabledForCurrentNode;

        for (let i: number = 0; i < commentsLength; i++) {
            const comment: ESTree.Comment = comments[i];

            if (ConditionalCommentNodeGuard.obfuscationEnableCommentRegExp.test(comment.value)) {
                obfuscationEnabled = true;

                continue;
            }

            if (ConditionalCommentNodeGuard.obfuscationDisableCommentRegExp.test(comment.value)) {
                obfuscationEnabled = false;
            }
        }

        return obfuscationEnabled;
    }
}
