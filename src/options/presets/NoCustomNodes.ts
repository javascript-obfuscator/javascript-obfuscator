import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { RenamePropertiesMode } from '../../enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';
import { SourceMapSourcesMode } from '../../enums/source-map/SourceMapSourcesMode';
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
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    exclude: [],
    forceTransformStrings: [],
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    identifiersPrefix: '',
    identifiersDictionary: [],
    ignoreImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    numbersToHexadecimal: true,
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: RenamePropertiesMode.Safe,
    reservedNames: [],
    reservedStrings: [],
    stringArrayRotate: false,
    seed: 0,
    selfDefending: false,
    stringArrayShuffle: false,
    simplify: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    sourceMapSourcesMode: SourceMapSourcesMode.SourcesContent,
    splitStrings: false,
    splitStringsChunkLength: 0,
    stringArray: false,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0,
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
