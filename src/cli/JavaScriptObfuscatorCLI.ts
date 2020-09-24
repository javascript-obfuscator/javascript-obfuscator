import * as commander from 'commander';
import * as path from 'path';

import { TInputCLIOptions } from '../types/options/TInputCLIOptions';
import { TInputOptions } from '../types/options/TInputOptions';

import { IFileData } from '../interfaces/cli/IFileData';
import { IInitializable } from '../interfaces/IInitializable';
import { IObfuscatedCode } from '../interfaces/source-code/IObfuscatedCode';

import { initializable } from '../decorators/Initializable';

import { IdentifierNamesGenerator } from '../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { LoggingPrefix } from '../enums/logger/LoggingPrefix';
import { ObfuscationTarget } from '../enums/ObfuscationTarget';
import { OptionsPreset } from '../enums/options/presets/OptionsPreset';
import { SourceMapMode } from '../enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { DEFAULT_PRESET } from '../options/presets/Default';

import { ArraySanitizer } from './sanitizers/ArraySanitizer';
import { BooleanSanitizer } from './sanitizers/BooleanSanitizer';

import { CLIUtils } from './utils/CLIUtils';
import { JavaScriptObfuscator } from '../JavaScriptObfuscatorFacade';
import { Logger } from '../logger/Logger';
import { ObfuscatedCodeWriter } from './utils/ObfuscatedCodeWriter';
import { SourceCodeReader } from './utils/SourceCodeReader';
import { Utils } from '../utils/Utils';

export class JavaScriptObfuscatorCLI implements IInitializable {
    /**
     * @type {string[]}
     */
    public static readonly availableInputExtensions: string[] = [
        '.js'
    ];

    /**
     * @type {BufferEncoding}
     */
    public static readonly encoding: BufferEncoding = 'utf8';

    /**
     * @type {string}
     */
    public static readonly obfuscatedFilePrefix: string = '-obfuscated';

    /**
     * @type {commander.CommanderStatic}
     */
    @initializable()
    private commands!: commander.CommanderStatic;

    /**
     * @type {TInputCLIOptions}
     */
    @initializable()
    private inputCLIOptions!: TInputCLIOptions;

    /**
     * @type {string}
     */
    @initializable()
    private inputPath!: string;

    /**
     * @type {SourceCodeReader}
     */
    @initializable()
    private sourceCodeReader!: SourceCodeReader;

    /**
     * @type {ObfuscatedCodeWriter}
     */
    @initializable()
    private obfuscatedCodeWriter!: ObfuscatedCodeWriter;

    /**
     * @type {string[]}
     */
    private readonly arguments: string[];

    /**
     * @type {string[]}
     */
    private readonly rawArguments: string[];

    /**
     * @param {string[]} argv
     */
    public constructor (argv: string[]) {
        this.rawArguments = argv;
        this.arguments = argv.slice(2);
    }

    /**
     * @param {TInputCLIOptions} inputOptions
     * @returns {TInputOptions}
     */
    private static buildOptions (inputOptions: TInputCLIOptions): TInputOptions {
        const inputCLIOptions: TInputOptions = JavaScriptObfuscatorCLI.filterOptions(inputOptions);
        const configFilePath: string | undefined = inputOptions.config;
        const configFileLocation: string = configFilePath ? path.resolve(configFilePath, '.') : '';
        const configFileOptions: TInputOptions = configFileLocation ? CLIUtils.getUserConfig(configFileLocation) : {};

        return {
            ...DEFAULT_PRESET,
            ...configFileOptions,
            ...inputCLIOptions
        };
    }

    /**
     * @param {TObject} options
     * @returns {TInputOptions}
     */
    private static filterOptions (options: TInputCLIOptions): TInputOptions {
        const filteredOptions: TInputOptions = {};

        Object
            .keys(options)
            .forEach((option: keyof TInputCLIOptions) => {
                if (options[option] === undefined) {
                    return;
                }

                filteredOptions[option] = options[option];
            });

        return filteredOptions;
    }

    public initialize (): void {
        this.inputPath = path.normalize(this.arguments[0] || '');
        this.commands = <commander.CommanderStatic>(new commander.Command());

        this.configureCommands();
        this.configureHelp();

        this.inputCLIOptions = JavaScriptObfuscatorCLI.buildOptions(this.commands.opts());
        this.sourceCodeReader = new SourceCodeReader(
            this.inputPath,
            this.inputCLIOptions
        );
        this.obfuscatedCodeWriter = new ObfuscatedCodeWriter(
            this.inputPath,
            this.inputCLIOptions
        );
    }

    public run (): void {
        const canShowHelp: boolean = !this.arguments.length || this.arguments.includes('--help');

        if (canShowHelp) {
            this.commands.outputHelp();

            return;
        }

        const sourceCodeData: IFileData[] = this.sourceCodeReader.readSourceCode();

        this.processSourceCodeData(sourceCodeData);
    }

    private configureCommands (): void {
        this.commands
            .usage('<inputPath> [options]')
            .version(
                Utils.buildVersionMessage(process.env.VERSION, process.env.BUILD_TIMESTAMP),
                '-v, --version'
            )
            .option(
                '-o, --output <path>',
                'Output path for obfuscated code'
            )
            .option(
                '--compact <boolean>',
                'Disable one line output code compacting',
                BooleanSanitizer
            )
            .option(
                '--config <boolean>',
                'Name of js / json config file'
            )
            .option(
                '--control-flow-flattening <boolean>',
                'Enables control flow flattening',
                BooleanSanitizer
            )
            .option(
                '--control-flow-flattening-threshold <number>',
                'The probability that the control flow flattening transformation will be applied to the node',
                parseFloat
            )
            .option(
                '--dead-code-injection <boolean>',
                'Enables dead code injection',
                BooleanSanitizer
            )
            .option(
                '--dead-code-injection-threshold <number>',
                'The probability that the dead code injection transformation will be applied to the node',
                parseFloat
            )
            .option(
                '--debug-protection <boolean>',
                'Disable browser Debug panel (can cause DevTools enabled browser freeze)',
                BooleanSanitizer
            )
            .option(
                '--debug-protection-interval <boolean>',
                'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)',
                BooleanSanitizer
            )
            .option(
                '--disable-console-output <boolean>',
                'Allow console.log, console.info, console.error and console.warn messages output into browser console',
                BooleanSanitizer
            )
            .option(
                '--domain-lock <list> (comma separated, without whitespaces)',
                'Allows to run the obfuscated source code only on specific domains and/or sub-domains (comma separated)',
                ArraySanitizer
            )
            .option(
                '--exclude <list> (comma separated, without whitespaces)',
                'A filename or glob which indicates files to exclude from obfuscation',
                ArraySanitizer
            )
            .option(
                '--force-transform-strings <list> (comma separated, without whitespaces)',
                'Enables force transformation of string literals, which being matched by passed RegExp patterns (comma separated)',
                ArraySanitizer
            )
            .option(
                '--identifier-names-generator <string>',
                'Sets identifier names generator. ' +
                `Values: ${CLIUtils.stringifyOptionAvailableValues(IdentifierNamesGenerator)}. ` +
                `Default: ${IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator}`
            )
            .option(
                '--identifiers-prefix <string>',
                'Sets prefix for all global identifiers'
            )
            .option(
                '--identifiers-dictionary <list> (comma separated, without whitespaces)',
                'Identifiers dictionary (comma separated) for `--identifier-names-generator dictionary` option',
                ArraySanitizer
            )
            .option(
                '--log <boolean>', 'Enables logging of the information to the console',
                BooleanSanitizer
            )
            .option(
                '--numbers-to-expressions <boolean>', 'Enables numbers conversion to expressions',
                BooleanSanitizer
            )
            .option(
                '--options-preset <string>',
                'Allows to set options preset. ' +
                `Values: ${CLIUtils.stringifyOptionAvailableValues(OptionsPreset)}. ` +
                `Default: ${OptionsPreset.Default}`
            )
            .option(
                '--reserved-names <list> (comma separated, without whitespaces)',
                'Disables obfuscation and generation of identifiers, which being matched by passed RegExp patterns (comma separated)',
                ArraySanitizer
            )
            .option(
                '--reserved-strings <list> (comma separated, without whitespaces)',
                'Disables transformation of string literals, which being matched by passed RegExp patterns (comma separated)',
                ArraySanitizer
            )
            .option(
                '--rename-globals <boolean>', 'Allows to enable obfuscation of global variable and function names with declaration',
                BooleanSanitizer
            )
            .option(
                '--rename-properties <boolean>', 'UNSAFE: Enables renaming of property names. This probably WILL break your code',
                BooleanSanitizer
            )
            .option(
                '--rotate-string-array <boolean>', 'Enable rotation of string array values during obfuscation',
                BooleanSanitizer
            )
            .option(
                '--seed <string|number>',
                'Sets seed for random generator. This is useful for creating repeatable results.',
                parseFloat
            )
            .option(
                '--self-defending <boolean>',
                'Disables self-defending for obfuscated code',
                BooleanSanitizer
            )
            .option(
                '--shuffle-string-array <boolean>', 'Randomly shuffles string array items',
                BooleanSanitizer
            )
            .option(
                '--simplify <boolean>', 'Enables additional code obfuscation through simplification',
                BooleanSanitizer
            )
            .option(
                '--source-map <boolean>',
                'Enables source map generation',
                BooleanSanitizer
            )
            .option(
                '--source-map-base-url <string>',
                'Sets base url to the source map import url when `--source-map-mode=separate`'
            )
            .option(
                '--source-map-file-name <string>',
                'Sets file name for output source map when `--source-map-mode=separate`'
            )
            .option(
                '--source-map-mode <string>',
                'Specify source map output mode. ' +
                `Values: ${CLIUtils.stringifyOptionAvailableValues(SourceMapMode)}. ` +
                `Default: ${SourceMapMode.Separate}`
            )
            .option(
                '--split-strings <boolean>',
                'Splits literal strings into chunks with length of `splitStringsChunkLength` option value',
                BooleanSanitizer
            )
            .option(
                '--split-strings-chunk-length <number>',
                'Sets chunk length of `splitStrings` option',
                parseFloat
            )
            .option(
                '--string-array <boolean>',
                'Disables gathering of all literal strings into an array and replacing every literal string with an array call',
                BooleanSanitizer
            )
            .option(
                '--string-array-encoding <list> (comma separated, without whitespaces)',
                'Encodes each string in strings array using base64 or rc4 (this option can slow down your code speed). ' +
                `Values: ${CLIUtils.stringifyOptionAvailableValues(StringArrayEncoding)}. ` +
                `Default: ${StringArrayEncoding.None}`,
                ArraySanitizer
            )
            .option(
                '--string-array-wrappers-count <number>',
                'Sets the count of wrappers for the string array inside each root or function scope',
                parseInt
            )
            .option(
                '--string-array-wrappers-chained-calls <boolean>',
                'Enables the chained calls between string array wrappers',
                BooleanSanitizer
            )
            .option(
                '--string-array-wrappers-type <string>',
                'Allows to select a type of the wrappers that are appending by the `--string-array-wrappers-count` option. ' +
                `Values: ${CLIUtils.stringifyOptionAvailableValues(StringArrayWrappersType)}. ` +
                `Default: ${StringArrayWrappersType.Variable}`
            )
            .option(
                '--string-array-threshold <number>',
                'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)',
                parseFloat
            )
            .option(
                '--target <string>',
                'Allows to set target environment for obfuscated code. ' +
                `Values: ${CLIUtils.stringifyOptionAvailableValues(ObfuscationTarget)}. ` +
                `Default: ${ObfuscationTarget.Browser}`
            )
            .option(
                '--transform-object-keys <boolean>',
                'Enables transformation of object keys',
                BooleanSanitizer
            )
            .option(
                '--unicode-escape-sequence <boolean>',
                'Allows to enable/disable string conversion to unicode escape sequence',
                BooleanSanitizer
            )
            .parse(this.rawArguments);
    }

    private configureHelp (): void {
        this.commands.on('--help', () => {
            console.log('  Examples:\n');
            console.log('    %> javascript-obfuscator input_file_name.js --compact true --self-defending false');
            console.log('    %> javascript-obfuscator input_file_name.js --output output_file_name.js --compact true --self-defending false');
            console.log('    %> javascript-obfuscator input_directory_name --compact true --self-defending false');
            console.log('');
        });
    }

    /**
     * @param {IFileData[]} sourceCodeData
     */
    private processSourceCodeData (sourceCodeData: IFileData[]): void {
        sourceCodeData.forEach(({ filePath, content }: IFileData, index: number) => {
            const outputCodePath: string = this.obfuscatedCodeWriter.getOutputCodePath(filePath);

            try {
                Logger.log(
                    Logger.colorInfo,
                    LoggingPrefix.CLI,
                    `Obfuscating file: ${filePath}...`
                );

                this.processSourceCode(content, filePath, outputCodePath, index);
            } catch (error) {
                Logger.log(
                    Logger.colorInfo,
                    LoggingPrefix.CLI,
                    `Error in file: ${filePath}...`
                );

                throw error;
            }
        });
    }

    /**
     * @param {string} sourceCode
     * @param {string} inputCodePath
     * @param {string} outputCodePath
     * @param {number | null} sourceCodeIndex
     */
    private processSourceCode (
        sourceCode: string,
        inputCodePath: string,
        outputCodePath: string,
        sourceCodeIndex: number | null
    ): void {
        const options: TInputOptions = {
            ...this.inputCLIOptions,
            inputFileName: path.basename(inputCodePath),
            ...sourceCodeIndex !== null && {
                identifiersPrefix: Utils.getIdentifiersPrefixForMultipleSources(
                    this.inputCLIOptions.identifiersPrefix,
                    sourceCodeIndex
                )
            }
        };

        if (options.sourceMap) {
            this.processSourceCodeWithSourceMap(sourceCode, outputCodePath, options);
        } else {
            this.processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options);
        }
    }

    /**
     * @param {string} sourceCode
     * @param {string} outputCodePath
     * @param {TInputOptions} options
     */
    private processSourceCodeWithoutSourceMap (
        sourceCode: string,
        outputCodePath: string,
        options: TInputOptions
    ): void {
        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(sourceCode, options).getObfuscatedCode();

        this.obfuscatedCodeWriter.writeFile(outputCodePath, obfuscatedCode);
    }

    /**
     * @param {string} sourceCode
     * @param {string} outputCodePath
     * @param {TInputOptions} options
     */
    private processSourceCodeWithSourceMap (
        sourceCode: string,
        outputCodePath: string,
        options: TInputOptions
    ): void {
        const outputSourceMapPath: string = this.obfuscatedCodeWriter.getOutputSourceMapPath(
            outputCodePath,
            options.sourceMapFileName ?? ''
        );

        options = {
            ...options,
            sourceMapFileName: path.basename(outputSourceMapPath)
        };

        const obfuscatedCode: IObfuscatedCode = JavaScriptObfuscator.obfuscate(sourceCode, options);

        this.obfuscatedCodeWriter.writeFile(outputCodePath, obfuscatedCode.getObfuscatedCode());

        if (options.sourceMapMode === SourceMapMode.Separate && obfuscatedCode.getSourceMap()) {
            this.obfuscatedCodeWriter.writeFile(outputSourceMapPath, obfuscatedCode.getSourceMap());
        }
    }
}
