import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { RenamePropertiesMode } from '../../enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';
import { StringArrayIndexesType } from '../../enums/node-transformers/string-array-transformers/StringArrayIndexesType';

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
    forceTransformStrings: [],
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    identifiersPrefix: '',
    identifiersDictionary: [],
    ignoreRequireImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: RenamePropertiesMode.Safe,
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
    stringArrayIndexesType: [
        StringArrayIndexesType.HexadecimalNumber
    ],
    stringArrayIndexShift: false,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersCount: 0,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: StringArrayWrappersType.Variable,
    stringArrayThreshold: 0,
    target: ObfuscationTarget.Browser,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
});
