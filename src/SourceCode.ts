import { ISourceCode } from './interfaces/ISourceCode';

export class SourceCode implements ISourceCode {
    /**
     * @type {string}
     */
    private readonly sourceCode: string;

    /**
     * @param {string} sourceCode
     */
    constructor (sourceCode: string) {
        this.sourceCode = sourceCode;
    }

    /**
     * @returns {string}
     */
    public getSourceCode (): string {
        return this.sourceCode;
    }
}
