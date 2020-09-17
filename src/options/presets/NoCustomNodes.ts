import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

export const NO_ADDITIONAL_NODES_PRESET: TInputOptions = Object.freeze({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    exclude: [],
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    identifiersPrefix: '',
    identifiersDictionary: [],
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    renameProperties: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: false,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: false,
    simplify: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    splitStrings: false,
    splitStringsChunkLength: 0,
    stringArray: false,
    stringArrayEncoding: [
        StringArrayEncoding.None
    ],
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersCount: 0,
    stringArrayWrappersType: StringArrayWrappersType.Variable,
    stringArrayThreshold: 0,
    target: ObfuscationTarget.Browser,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
});
