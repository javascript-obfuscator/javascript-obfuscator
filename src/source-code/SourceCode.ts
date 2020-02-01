import { ISourceCode } from '../interfaces/source-code/ISourceCode';

export class SourceCode implements ISourceCode {
    /**
     * @type {string}
     */
    private readonly sourceCode: string;

    /**
     * @type {string}
     */
    private readonly sourceMap: string;

    /**
     * @param {string} sourceCode
     * @param {string} sourceMap
     */
    public constructor (sourceCode: string, sourceMap: string) {
        this.sourceCode = sourceCode;
        this.sourceMap = sourceMap;
    }

    /**
     * @returns {string}
     */
    public getSourceCode (): string {
        return this.sourceCode;
    }

    /**
     * @returns {string}
     */
    public getSourceMap (): string {
        return this.sourceMap;
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        return this.sourceCode;
    }
}
