import * as commander from 'commander';
import * as path from 'path';

import { TInputCLIOptions } from '../types/options/TInputCLIOptions';
import { TInputOptions } from '../types/options/TInputOptions';
import { TSourceCodeData } from '../types/cli/TSourceCodeData';

import { IFileData } from '../interfaces/cli/IFileData';
import { IInitializable } from '../interfaces/IInitializable';
import { IObfuscatedCode } from '../interfaces/source-code/IObfuscatedCode';

import { initializable } from '../decorators/Initializable';

import { DEFAULT_PRESET } from '../options/presets/Default';

import { ArraySanitizer } from './sanitizers/ArraySanitizer';
import { BooleanSanitizer } from './sanitizers/BooleanSanitizer';
import { IdentifierNamesGeneratorSanitizer } from './sanitizers/IdentifierNamesGeneratorSanitizer';
import { ObfuscationTargetSanitizer } from './sanitizers/ObfuscatingTargetSanitizer';
import { SourceMapModeSanitizer } from './sanitizers/SourceMapModeSanitizer';
import { StringArrayEncodingSanitizer } from './sanitizers/StringArrayEncodingSanitizer';

import { CLIUtils } from './utils/CLIUtils';
import { JavaScriptObfuscator } from '../JavaScriptObfuscatorFacade';
import { SourceCodeReader } from './utils/SourceCodeReader';

export class JavaScriptObfuscatorCLI implements IInitializable {
    /**
     * @type {BufferEncoding}
     */
    public static readonly encoding: BufferEncoding = 'utf8';

    /**
     * @type {string}
     */
    public static obfuscatedFilePrefix: string = '-obfuscated';

    /**
     * @type {string}
     */
    private static readonly baseIdentifiersPrefix: string = 'a';

    /**
     * @type {string[]}
     */
    private readonly arguments: string[];

    /**
     * @type {string[]}
     */
    private readonly rawArguments: string[];

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
     * @param {string[]} argv
     */
    constructor (argv: string[]) {
        this.rawArguments = argv;
        this.arguments = argv.slice(2);
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

    /**
     * @param {string} sourceCode
     * @param {string} outputCodePath
     * @param {TInputOptions} options
     */
    private static processSourceCodeWithoutSourceMap (
        sourceCode: string,
        outputCodePath: string,
        options: TInputOptions
    ): void {
        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(sourceCode, options).getObfuscatedCode();

        CLIUtils.writeFile(outputCodePath, obfuscatedCode);
    }

    /**
     * @param {string} sourceCode
     * @param {string} outputCodePath
     * @param {TInputOptions} options
     */
    private static processSourceCodeWithSourceMap (
        sourceCode: string,
        outputCodePath: string,
        options: TInputOptions
    ): void {
        const outputSourceMapPath: string = CLIUtils.getOutputSourceMapPath(
            outputCodePath,
            options.sourceMapFileName || ''
        );

        options = {
            ...options,
            sourceMapFileName: path.basename(outputSourceMapPath)
        };

        const obfuscatedCode: IObfuscatedCode = JavaScriptObfuscator.obfuscate(sourceCode, options);

        CLIUtils.writeFile(outputCodePath, obfuscatedCode.getObfuscatedCode());

        if (options.sourceMapMode === 'separate' && obfuscatedCode.getSourceMap()) {
            CLIUtils.writeFile(outputSourceMapPath, obfuscatedCode.getSourceMap());
        }
    }

    public initialize (): void {
        this.inputPath = path.normalize(this.arguments[0] || '');
        this.commands = <commander.CommanderStatic>(new commander.Command());

        this.configureCommands();
        this.configureHelp();

        this.inputCLIOptions = this.commands.opts();
    }

    public run (): void {
        const canShowHelp: boolean = !this.arguments.length || this.arguments.includes('--help');

        if (canShowHelp) {
            this.commands.outputHelp();

            return;
        }

        const sourceCodeData: TSourceCodeData = new SourceCodeReader(this.inputCLIOptions)
            .readSourceCode(this.inputPath);

        this.processSourceCodeData(sourceCodeData);
    }

    /**
     * @returns {TInputOptions}
     */
    private buildOptions (): TInputOptions {
        const inputCLIOptions: TInputOptions = JavaScriptObfuscatorCLI.filterOptions(this.inputCLIOptions);
        const configFilePath: string | undefined = this.inputCLIOptions.config;
        const configFileLocation: string = configFilePath ? path.resolve(configFilePath, '.') : '';
        const configFileOptions: TInputOptions = configFileLocation ? CLIUtils.getUserConfig(configFileLocation) : {};
        const inputFileName: string = path.basename(this.inputPath);

        return {
            ...DEFAULT_PRESET,
            ...configFileOptions,
            ...inputCLIOptions,
            inputFileName
        };
    }

    private configureCommands (): void {
        this.commands
            .usage('<inputPath> [options]')
            .version(
                process.env.VERSION || 'unknown',
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
                'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)',
                ArraySanitizer
            )
            .option(
                '--exclude <list> (comma separated, without whitespaces)',
                'A filename or glob which indicates files to exclude from obfuscation',
                ArraySanitizer
            )
            .option(
                '--identifier-names-generator <string>',
                'Sets identifier names generator. ' +
                'Values: hexadecimal, mangled. ' +
                'Default: hexadecimal',
                IdentifierNamesGeneratorSanitizer
            )
            .option(
                '--identifiers-prefix <string>',
                'Sets prefix for all global identifiers.'
            )
            .option(
                '--log <boolean>', 'Enables logging of the information to the console',
                BooleanSanitizer
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
                '--rename-globals <boolean>', 'Allows to enable obfuscation of global variable and function names with declaration.',
                BooleanSanitizer
            )
            .option(
                '--rotate-string-array <boolean>', 'Disable rotation of unicode array values during obfuscation',
                BooleanSanitizer
            )
            .option(
                '--seed <number>',
                'Sets seed for random generator. This is useful for creating repeatable results.',
                parseFloat
            )
            .option(
                '--self-defending <boolean>',
                'Disables self-defending for obfuscated code',
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
                'Values: inline, separate. ' +
                'Default: separate',
                SourceMapModeSanitizer
            )
            .option(
                '--string-array <boolean>',
                'Disables gathering of all literal strings into an array and replacing every literal string with an array call',
                BooleanSanitizer
            )
            .option(
                '--string-array-encoding <string|boolean>',
                'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed. ' +
                'Values: true, false, base64, rc4. ' +
                'Default: false',
                StringArrayEncodingSanitizer
            )
            .option(
                '--string-array-threshold <number>',
                'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)',
                parseFloat
            )
            .option(
                '--target <string>',
                'Allows to set target environment for obfuscated code. ' +
                'Values: browser, browser-no-eval, node. ' +
                'Default: browser',
                ObfuscationTargetSanitizer
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
     * @param {TSourceCodeData} sourceCodeData
     */
    private processSourceCodeData (sourceCodeData: TSourceCodeData): void {
        const outputPath: string = this.inputCLIOptions.output
            ? path.normalize(this.inputCLIOptions.output)
            : '';

        if (!Array.isArray(sourceCodeData)) {
            const outputCodePath: string = outputPath || CLIUtils.getOutputCodePath(this.inputPath);

            this.processSourceCode(sourceCodeData, outputCodePath, null);
        } else {
            sourceCodeData.forEach(({ filePath, content }: IFileData, index: number) => {
                const outputCodePath: string = outputPath
                    ? path.join(outputPath, filePath)
                    : CLIUtils.getOutputCodePath(filePath);

                this.processSourceCode(content, outputCodePath, index);
            });
        }
    }

    /**
     * @param {string} sourceCode
     * @param {string} outputCodePath
     * @param {number | null} sourceCodeIndex
     */
    private processSourceCode (
        sourceCode: string,
        outputCodePath: string,
        sourceCodeIndex: number | null
    ): void {
        let options: TInputOptions = this.buildOptions();

        if (sourceCodeIndex !== null) {
            const baseIdentifiersPrefix: string = this.inputCLIOptions.identifiersPrefix
                || JavaScriptObfuscatorCLI.baseIdentifiersPrefix;
            const identifiersPrefix: string = `${baseIdentifiersPrefix}${sourceCodeIndex}`;

            options = {
                ...options,
                identifiersPrefix
            };
        }

        if (options.sourceMap) {
            JavaScriptObfuscatorCLI.processSourceCodeWithSourceMap(sourceCode, outputCodePath, options);
        } else {
            JavaScriptObfuscatorCLI.processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options);
        }
    }
}
