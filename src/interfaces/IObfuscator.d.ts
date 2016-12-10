import * as ESTree from 'estree';

export interface IObfuscator {
    /**
     * @param astTree
     * @returns ESTree.Program
     */
    obfuscateAstTree (astTree: ESTree.Program): ESTree.Program;
}
