import { Command } from 'commander';

import { IObfuscationResult } from "../interfaces/IObfuscationResult";
import { IOptionsPreset } from "../interfaces/IOptionsPreset";

import { SourceMapMode } from "../enums/SourceMapMode";

import { DEFAULT_PRESET } from "../preset-options/DefaultPreset";

import { CLIUtils } from "./CLIUtils";
import { JavaScriptObfuscator } from "../JavaScriptObfuscator";
import { JavaScriptObfuscatorInternal } from "../JavaScriptObfuscatorInternal";
import { Utils } from "../Utils";

export class JavaScriptObfuscatorCLI {
    /**
     * @type {string[]}
     */
    private arguments: string[];

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
        let availableMode: boolean = Object
            .keys(SourceMapMode)
            .some((key: string): boolean => {
                return SourceMapMode[key] === value;
            });

        if (!availableMode) {
            throw new ReferenceError('Invalid value of `--sourceMapMode` option');
        }

        return value;
    }

    public run (): void {
        this.configureCommands();

        if (!this.arguments.length || Utils.arrayContains(this.arguments, '--help')) {
            this.commands.outputHelp();

            return;
        }

        this.inputPath = CLIUtils.getInputPath(this.arguments);

        this.getData();
        this.processData();
    }

    /**
     * @returns {IOptionsPreset}
     */
    private buildOptions (): IOptionsPreset {
        let options: IOptionsPreset = {},
            availableOptions: string[] = Object.keys(DEFAULT_PRESET);

        for (let option in this.commands) {
            if (!this.commands.hasOwnProperty(option)) {
                continue;
            }

            if (!Utils.arrayContains(availableOptions, option)) {
                continue;
            }

            options[option] = (<any>this.commands)[option];
        }

        return Object.assign({}, DEFAULT_PRESET, options);
    }

    private configureCommands (): void {
        this.commands = new Command()
            .version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version')
            .usage('<inputPath> [options]')
            .option('-o, --output <path>', 'Output path for obfuscated code')
            .option('--compact <boolean>', 'Disable one line output code compacting', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--encodeUnicodeLiterals <boolean>', 'All literals in Unicode array become encoded in Base64 (this option can slightly slow down your code speed)', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', (val: string) => val.split(','))
            .option('--rotateUnicodeArray <boolean>', 'Disable rotation of unicode array values during obfuscation', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--sourceMap <boolean>', 'Enables source map generation', JavaScriptObfuscatorCLI.parseBoolean)
            .option(
                '--sourceMapMode <string> [inline, separate]',
                'Specify source map output mode',
                JavaScriptObfuscatorCLI.parseSourceMapMode
            )
            .option('--unicodeArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--unicodeArrayThreshold <number>', 'The probability that the literal string will be inserted into unicodeArray (Default: 0.8, Min: 0, Max: 1)', parseFloat)
            .option('--wrapUnicodeArrayCalls <boolean>', 'Disables usage of special access function instead of direct array call', JavaScriptObfuscatorCLI.parseBoolean)
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
        let options: IOptionsPreset = this.buildOptions(),
            outputCodePath: string = CLIUtils.getOutputCodePath(this.commands, this.inputPath);

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
    private processDataWithoutSourceMap (outputCodePath: string, options: IOptionsPreset): void {
        let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(this.data, options);

        CLIUtils.writeFile(outputCodePath, obfuscatedCode);
    }

    /**
     * @param outputCodePath
     * @param options
     */
    private processDataWithSourceMap (outputCodePath: string, options: IOptionsPreset): void {
        let javaScriptObfuscator: JavaScriptObfuscatorInternal = new JavaScriptObfuscatorInternal(this.data, options),
            obfuscationResult: IObfuscationResult,
            outputSourceMapPath: string = CLIUtils.getOutputSourceMapPath(outputCodePath);

        javaScriptObfuscator.obfuscate();

        if (options.sourceMapMode === SourceMapMode.Separate) {
            javaScriptObfuscator.setSourceMapUrl(
                [...outputSourceMapPath.split('/')].pop()
            );
        }

        obfuscationResult = javaScriptObfuscator.getObfuscationResult();

        CLIUtils.writeFile(outputCodePath, obfuscationResult.obfuscatedCode);

        if (obfuscationResult.sourceMap) {
            CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.sourceMap);
        }
    }
}
