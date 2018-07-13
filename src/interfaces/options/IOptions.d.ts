import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';

export interface IOptions {
    readonly compact: boolean;
    readonly controlFlowFlattening: boolean;
    readonly controlFlowFlatteningThreshold: number;
    readonly deadCodeInjection: boolean;
    readonly deadCodeInjectionThreshold: number;
    readonly debugProtection: boolean;
    readonly debugProtectionInterval: boolean;
    readonly disableConsoleOutput: boolean;
    readonly domainLock: string[];
    readonly identifierNamesGenerator: IdentifierNamesGenerator;
    readonly identifiersPrefix: string;
    readonly inputFileName: string;
    readonly log: boolean;
    readonly renameGlobals: boolean;
    readonly reservedNames: string[];
    readonly reservedStrings: string[];
    readonly rotateStringArray: boolean;
    readonly seed: number;
    readonly selfDefending: boolean;
    readonly sourceMap: boolean;
    readonly sourceMapBaseUrl: string;
    readonly sourceMapFileName: string;
    readonly sourceMapMode: SourceMapMode;
    readonly stringArray: boolean;
    readonly stringArrayEncoding: TStringArrayEncoding;
    readonly stringArrayThreshold: number;
    readonly target: ObfuscationTarget;
    readonly transformObjectKeys: boolean;
    readonly unicodeEscapeSequence: boolean;
}
