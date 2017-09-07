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
    private obfuscationAllowedForCurrentNode: boolean = true;

    /**
     * @type {boolean}
     */
    private obfuscationAllowedForNextNode: boolean | null = null;

    /**
     * @returns {boolean}
     * @param node
     */
    public check (node: ESTree.Node): boolean {
        if (this.obfuscationAllowedForNextNode) {
            this.obfuscationAllowedForCurrentNode = this.obfuscationAllowedForNextNode;
            this.obfuscationAllowedForNextNode = null;
        }

        if (!node.leadingComments && !node.trailingComments) {
            return this.obfuscationAllowedForCurrentNode;
        }

        const leadingComments: ESTree.Comment[] | undefined = node.leadingComments;
        const trailingComments: ESTree.Comment[] | undefined = node.trailingComments;

        if (leadingComments) {
            this.obfuscationAllowedForCurrentNode = this.checkComments(leadingComments);
        }

        if (trailingComments) {
            this.obfuscationAllowedForNextNode = this.checkComments(trailingComments);
        }

        return this.obfuscationAllowedForCurrentNode;
    }

    /**
     * @param {Comment[]} comments
     * @returns {boolean}
     */
    private checkComments (comments: ESTree.Comment[]): boolean {
        const commentsLength: number = comments.length;

        let obfuscationAllowed: boolean = this.obfuscationAllowedForCurrentNode;

        for (let i: number = 0; i < commentsLength; i++) {
            const comment: ESTree.Comment = comments[i];

            if (ConditionalCommentNodeGuard.obfuscationEnableCommentRegExp.test(comment.value)) {
                obfuscationAllowed = true;

                continue;
            }

            if (ConditionalCommentNodeGuard.obfuscationDisableCommentRegExp.test(comment.value)) {
                obfuscationAllowed = false;
            }
        }

        return obfuscationAllowed;
    }
}
