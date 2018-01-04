import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';

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
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    log: false,
    renameGlobals: false,
    reservedNames: [],
    rotateStringArray: false,
    seed: 0,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    stringArray: false,
    stringArrayEncoding: false,
    stringArrayThreshold: 0,
    target: ObfuscationTarget.Browser,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
});
