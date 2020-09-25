import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

export const DEFAULT_PRESET: TInputOptions = Object.freeze({
    compact: true,
    config: '',
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    exclude: [],
    forceTransformStrings: [],
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    identifiersPrefix: '',
    identifiersDictionary: [],
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    optionsPreset: OptionsPreset.Default,
    renameGlobals: false,
    renameProperties: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: true,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    splitStrings: false,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: [
        StringArrayEncoding.None
    ],
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersType: StringArrayWrappersType.Variable,
    stringArrayThreshold: 0.75,
    target: ObfuscationTarget.Browser,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
});
