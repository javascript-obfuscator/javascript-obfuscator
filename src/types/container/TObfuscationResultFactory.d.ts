import * as ESTree from 'estree';

import { IObfuscationResult } from '../../interfaces/IObfuscationResult';

export type TObfuscationResultFactory = (obfuscatedAst: ESTree.Program, obfuscatedCode: string, sourceMap: string) => IObfuscationResult;
