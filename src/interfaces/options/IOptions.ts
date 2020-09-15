import { TypeFromEnum } from '@gradecam/tsenum';

import { TOptionsPreset } from '../../types/options/TOptionsPreset';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';
import { TStringArrayWrappersType } from '../../types/options/TStringArrayWrappersType';

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
    readonly identifierNamesGenerator: TypeFromEnum<typeof IdentifierNamesGenerator>;
    readonly identifiersDictionary: string[];
    readonly identifiersPrefix: string;
    readonly inputFileName: string;
    readonly log: boolean;
    readonly numbersToExpressions: boolean;
    readonly optionsPreset: TOptionsPreset;
    readonly renameGlobals: boolean;
    readonly renameProperties: boolean;
    readonly reservedNames: string[];
    readonly reservedStrings: string[];
    readonly rotateStringArray: boolean;
    readonly seed: string | number;
    readonly selfDefending: boolean;
    readonly shuffleStringArray: boolean;
    readonly simplify: boolean;
    readonly sourceMap: boolean;
    readonly sourceMapBaseUrl: string;
    readonly sourceMapFileName: string;
    readonly sourceMapMode: TypeFromEnum<typeof SourceMapMode>;
    readonly splitStrings: boolean;
    readonly splitStringsChunkLength: number;
    readonly stringArray: boolean;
    readonly stringArrayEncoding: TStringArrayEncoding[];
    readonly stringArrayWrappersChainedCalls: boolean;
    readonly stringArrayWrappersCount: number;
    readonly stringArrayWrappersType: TStringArrayWrappersType;
    readonly stringArrayThreshold: number;
    readonly target: TypeFromEnum<typeof ObfuscationTarget>;
    readonly transformObjectKeys: boolean;
    readonly unicodeEscapeSequence: boolean;
}
