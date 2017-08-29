import * as commander from 'commander';
import * as path from 'path';

import { TInputCLIOptions } from '../types/options/TInputCLIOptions';
import { TInputOptions } from '../types/options/TInputOptions';
import { TObject } from '../types/TObject';

import { IInitializable } from '../interfaces/IInitializable';
import { IObfuscationResult } from '../interfaces/IObfuscationResult';

import { initializable } from '../decorators/Initializable';

import { DEFAULT_PRESET } from '../options/presets/Default';

import { ArraySanitizer } from './sanitizers/ArraySanitizer';
import { BooleanSanitizer } from './sanitizers/BooleanSanitizer';
import { SourceMapModeSanitizer } from './sanitizers/SourceMapModeSanitizer';
import { StringArrayEncodingSanitizer } from './sanitizers/StringArrayEncodingSanitizer';

import { CLIUtils } from './utils/CLIUtils';
import { JavaScriptObfuscator } from '../JavaScriptObfuscator';

export class JavaScriptObfuscatorCLI implements IInitializable {
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
    private commands: commander.CommanderStatic;

    /**
     * @type {TInputCLIOptions}
     */
    @initializable()
    private inputCLIOptions: TInputCLIOptions;

    /**
     * @type {string}
     */
    @initializable()
    private inputPath: string;

    /**
     * @type {string}
     */
    @initializable()
    private sourceCode: string = '';

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
    private static filterOptions (options: TObject): TInputOptions {
        const filteredOptions: TInputOptions = {};

        for (const option in options) {
            if (!options.hasOwnProperty(option) || options[option] === undefined) {
                continue;
            }

            filteredOptions[option] = options[option];
        }

        return filteredOptions;
    }

    public initialize (): void {
        this.inputPath = this.arguments[0] || '';
        this.commands = <commander.CommanderStatic>(new commander.Command());

        this.configureCommands();
        this.configureHelp();

        this.inputCLIOptions = this.commands.opts();
    }

    public run (): void {
        const canShowHelp: boolean = !this.arguments.length || this.arguments.includes('--help');

        if (canShowHelp) {
            return this.commands.outputHelp();
        }

        this.sourceCode = CLIUtils.readSourceCode(this.inputPath);
        this.processSourceCode();
    }

    /**
     * @returns {TInputOptions}
     */
    private buildOptions (): TInputOptions {
        const inputCLIOptions: TInputOptions = JavaScriptObfuscatorCLI.filterOptions(this.inputCLIOptions);
        const configFilePath: string | undefined = this.inputCLIOptions.config;
        const configFileLocation: string = configFilePath ? path.resolve(configFilePath, '.') : '';
        const configFileOptions: TInputOptions = configFileLocation ? CLIUtils.getUserConfig(configFileLocation) : {};

        return {
            ...DEFAULT_PRESET,
            ...configFileOptions,
            ...inputCLIOptions
        };
    }

    private configureCommands (): void {
        this.commands
            .usage('<inputPath> [options]')
            .version(
                CLIUtils.getPackageConfig().version,
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
                '--controlFlowFlattening <boolean>',
                'Enables control flow flattening',
                BooleanSanitizer
            )
            .option(
                '--controlFlowFlatteningThreshold <number>',
                'The probability that the control flow flattening transformation will be applied to the node',
                parseFloat
            )
            .option(
                '--deadCodeInjection <boolean>',
                'Enables dead code injection',
                BooleanSanitizer
            )
            .option(
                '--deadCodeInjectionThreshold <number>',
                'The probability that the dead code injection transformation will be applied to the node',
                parseFloat
            )
            .option(
                '--debugProtection <boolean>',
                'Disable browser Debug panel (can cause DevTools enabled browser freeze)',
                BooleanSanitizer
            )
            .option(
                '--debugProtectionInterval <boolean>',
                'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)',
                BooleanSanitizer
            )
            .option(
                '--disableConsoleOutput <boolean>',
                'Allow console.log, console.info, console.error and console.warn messages output into browser console',
                BooleanSanitizer
            )
            .option(
                '--domainLock <list>',
                'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)',
                ArraySanitizer
            )
            .option(
                '--log <boolean>', 'Enables logging of the information to the console',
                BooleanSanitizer
            )
            .option(
                '--mangle <boolean>', 'Enables mangling of variable names',
                BooleanSanitizer
            )
            .option(
                '--reservedNames <list>',
                'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)',
                ArraySanitizer
            )
            .option(
                '--renameGlobals <boolean>', 'Allows to enable obfuscation of global variable and function names with declaration.',
                BooleanSanitizer
            )
            .option(
                '--rotateStringArray <boolean>', 'Disable rotation of unicode array values during obfuscation',
                BooleanSanitizer
            )
            .option(
                '--seed <number>',
                'Sets seed for random generator. This is useful for creating repeatable results.',
                parseFloat
            )
            .option(
                '--selfDefending <boolean>',
                'Disables self-defending for obfuscated code',
                BooleanSanitizer
            )
            .option(
                '--sourceMap <boolean>',
                'Enables source map generation',
                BooleanSanitizer
            )
            .option(
                '--sourceMapBaseUrl <string>',
                'Sets base url to the source map import url when `--sourceMapMode=separate`'
            )
            .option(
                '--sourceMapFileName <string>',
                'Sets file name for output source map when `--sourceMapMode=separate`'
            )
            .option(
                '--sourceMapMode <string> [inline, separate]',
                'Specify source map output mode',
                SourceMapModeSanitizer
            )
            .option(
                '--stringArray <boolean>',
                'Disables gathering of all literal strings into an array and replacing every literal string with an array call',
                BooleanSanitizer
            )
            .option(
                '--stringArrayEncoding <boolean|string> [true, false, base64, rc4]',
                'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed',
                StringArrayEncodingSanitizer
            )
            .option(
                '--stringArrayThreshold <number>',
                'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)',
                parseFloat
            )
            .option(
                '--unicodeEscapeSequence <boolean>',
                'Allows to enable/disable string conversion to unicode escape sequence',
                BooleanSanitizer
            )
            .parse(this.rawArguments);
    }

    private configureHelp (): void {
        this.commands.on('--help', () => {
            console.log('  Examples:\n');
            console.log('    %> javascript-obfuscator in.js --compact true --selfDefending false');
            console.log('    %> javascript-obfuscator in.js --output out.js --compact true --selfDefending false');
            console.log('');
        });
    }

    private processSourceCode (): void {
        const options: TInputOptions = this.buildOptions();
        const outputCodePath: string = CLIUtils.getOutputCodePath(this.inputCLIOptions.output, this.inputPath);

        if (options.sourceMap) {
            this.processSourceCodeWithSourceMap(outputCodePath, options);
        } else {
            this.processSourceCodeWithoutSourceMap(outputCodePath, options);
        }
    }

    /**
     * @param {string} outputCodePath
     * @param {TInputOptions} options
     */
    private processSourceCodeWithoutSourceMap (outputCodePath: string, options: TInputOptions): void {
        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(this.sourceCode, options).getObfuscatedCode();

        CLIUtils.writeFile(outputCodePath, obfuscatedCode);
    }

    /**
     * @param {string} outputCodePath
     * @param {TInputOptions} options
     */
    private processSourceCodeWithSourceMap (outputCodePath: string, options: TInputOptions): void {
        const outputSourceMapPath: string = CLIUtils.getOutputSourceMapPath(
            outputCodePath,
            options.sourceMapFileName || ''
        );

        options = {
            ...options,
            sourceMapFileName: path.basename(outputSourceMapPath)
        };

        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(this.sourceCode, options);

        CLIUtils.writeFile(outputCodePath, obfuscationResult.getObfuscatedCode());

        if (options.sourceMapMode === 'separate' && obfuscationResult.getSourceMap()) {
            CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.getSourceMap());
        }
    }
}
