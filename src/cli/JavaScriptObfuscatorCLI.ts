import * as commander from 'commander';
import * as path from 'path';

import { TInputOptions } from '../types/options/TInputOptions';
import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';

import { IObfuscationResult } from '../interfaces/IObfuscationResult';

import { SourceMapMode } from '../enums/SourceMapMode';
import { StringArrayEncoding } from '../enums/StringArrayEncoding';

import { DEFAULT_PRESET } from '../options/presets/Default';

import { CLIUtils } from './CLIUtils';
import { JavaScriptObfuscator } from '../JavaScriptObfuscator';

export class JavaScriptObfuscatorCLI {
    /**
     * @type {string[]}
     */
    private readonly arguments: string[];

    /**
     * @type {commander.ICommand}
     */
    private commands: commander.ICommand;

    /**
     * @type {string}
     */
    private data: string = '';

    /**
     * @type {string}
     */
    private inputPath: string;

    /**
     * @type {string[]}
     */
    private rawArguments: string[];

    /**
     * @param argv
     */
    constructor (argv: string[]) {
        this.rawArguments = argv;
        this.arguments = this.rawArguments.slice(2);
    }

    /**
     * @returns {string}
     */
    private static getBuildVersion (): string {
        return CLIUtils.getPackageConfig().version;
    }

    /**
     * @param value
     * @returns {boolean}
     */
    private static parseBoolean (value: string): boolean {
        return value === 'true' || value === '1';
    }

    /**
     * @param value
     * @returns {string}
     */
    private static parseSourceMapMode (value: string): string {
        const availableMode: boolean = Object
            .keys(SourceMapMode)
            .some((key: string): boolean => {
                return SourceMapMode[key] === value;
            });

        if (!availableMode) {
            throw new ReferenceError('Invalid value of `--sourceMapMode` option');
        }

        return value;
    }

    /**
     * @param value
     * @returns {TStringArrayEncoding}
     */
    private static parseStringArrayEncoding (value: string): TStringArrayEncoding {
        switch (value) {
            case 'true':
            case '1':
            case StringArrayEncoding.base64:
                return true;

            case StringArrayEncoding.rc4:
                return StringArrayEncoding.rc4;

            default:
                return false;
        }
    }

    public run (): void {
        this.configureCommands();

        if (!this.arguments.length || this.arguments.includes('--help')) {
            this.commands.outputHelp();

            return;
        }

        this.inputPath = this.arguments[0];
        CLIUtils.validateInputPath(this.inputPath);

        this.getData();
        this.processData();
    }

    /**
     * @returns {TInputOptions}
     */
    private buildOptions (): TInputOptions {
        const inputOptions: TInputOptions = {};
        const availableOptions: string[] = Object.keys(DEFAULT_PRESET);

        for (const option in this.commands) {
            if (!this.commands.hasOwnProperty(option)) {
                continue;
            }

            if (!availableOptions.includes(option)) {
                continue;
            }

            (<any>inputOptions)[option] = (<any>this.commands)[option];
        }

        return {
            ...DEFAULT_PRESET,
            ...inputOptions
        };
    }

    private configureCommands (): void {
        this.commands = new commander.Command()
            .version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version')
            .usage('<inputPath> [options]')
            .option(
                '-o, --output <path>',
                'Output path for obfuscated code'
            )
            .option(
                '--compact <boolean>',
                'Disable one line output code compacting',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--controlFlowFlattening <boolean>',
                'Enables control flow flattening',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--controlFlowFlatteningThreshold <number>',
                'The probability that the control flow flattening transformation will be applied to the node',
                parseFloat
            )
            .option(
                '--debugProtection <boolean>',
                'Disable browser Debug panel (can cause DevTools enabled browser freeze)',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--debugProtectionInterval <boolean>',
                'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--disableConsoleOutput <boolean>',
                'Allow console.log, console.info, console.error and console.warn messages output into browser console',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--domainLock <list>',
                'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)',
                (value: string) => value.split(',')
            )
            .option(
                '--reservedNames <list>',
                'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)',
                (value: string) => value.split(',')
            )
            .option(
                '--rotateStringArray <boolean>', 'Disable rotation of unicode array values during obfuscation',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--seed <number>',
                'Sets seed for random generator. This is useful for creating repeatable results.',
                parseFloat
            )
            .option(
                '--selfDefending <boolean>',
                'Disables self-defending for obfuscated code',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--sourceMap <boolean>',
                'Enables source map generation',
                JavaScriptObfuscatorCLI.parseBoolean
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
                JavaScriptObfuscatorCLI.parseSourceMapMode
            )
            .option(
                '--stringArray <boolean>',
                'Disables gathering of all literal strings into an array and replacing every literal string with an array call',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .option(
                '--stringArrayEncoding <boolean|string> [true, false, base64, rc4]',
                'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed',
                JavaScriptObfuscatorCLI.parseStringArrayEncoding
            )
            .option(
                '--stringArrayThreshold <number>',
                'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)',
                parseFloat
            )
            .option(
                '--unicodeEscapeSequence <boolean>',
                'Allows to enable/disable string conversion to unicode escape sequence',
                JavaScriptObfuscatorCLI.parseBoolean
            )
            .parse(this.rawArguments);

        this.commands.on('--help', () => {
            console.log('  Examples:\n');
            console.log('    %> javascript-obfuscator in.js --compact true --selfDefending false');
            console.log('    %> javascript-obfuscator in.js --output out.js --compact true --selfDefending false');
            console.log('');
        });
    }

    private getData (): void {
        this.data = CLIUtils.readFile(this.inputPath);
    }

    private processData (): void {
        const options: TInputOptions = this.buildOptions();
        const outputCodePath: string = CLIUtils.getOutputCodePath((<any>this.commands).output, this.inputPath);

        if (options.sourceMap) {
            this.processDataWithSourceMap(outputCodePath, options);
        } else {
            this.processDataWithoutSourceMap(outputCodePath, options);
        }
    }

    /**
     * @param outputCodePath
     * @param options
     */
    private processDataWithoutSourceMap (outputCodePath: string, options: TInputOptions): void {
        const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(this.data, options).getObfuscatedCode();

        CLIUtils.writeFile(outputCodePath, obfuscatedCode);
    }

    /**
     * @param outputCodePath
     * @param options
     */
    private processDataWithSourceMap (outputCodePath: string, options: TInputOptions): void {
        const outputSourceMapPath: string = CLIUtils.getOutputSourceMapPath(
            outputCodePath,
            options.sourceMapFileName || ''
        );

        options = {
            ...options,
            sourceMapFileName: path.basename(outputSourceMapPath)
        };

        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(this.data, options);

        CLIUtils.writeFile(outputCodePath, obfuscationResult.getObfuscatedCode());

        if (options.sourceMapMode === 'separate' && obfuscationResult.getSourceMap()) {
            CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.getSourceMap());
        }
    }
}
