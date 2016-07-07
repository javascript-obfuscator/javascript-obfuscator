import { Command } from 'commander';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

import { IOptionsPreset } from "../interfaces/IOptionsPreset";
import { IPackageConfig } from "../interfaces/IPackageConfig";

import { SourceMapMode } from "../enums/SourceMapMode";

import { DEFAULT_PRESET } from "../preset-options/DefaultPreset";

import { JavaScriptObfuscator } from "../JavaScriptObfuscator";
import { SourceMapInjector } from "../SourceMapInjector";
import { Utils } from "../Utils";

export class JavaScriptObfuscatorCLI {
    /**
     * @type {string[]}
     */
    private static availableInputExtensions: string[] = [
        '.js'
    ];

    /**
     * @type {BufferEncoding}
     */
    private static encoding: BufferEncoding = 'utf8';

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
        return JavaScriptObfuscatorCLI.getPackageConfig().version;
    }

    private static getPackageConfig (): IPackageConfig {
        return JSON.parse(
            fs.readFileSync(
                path.join(
                    path.dirname(
                        fs.realpathSync(process.argv[1])
                    ),
                    '../package.json'
                ),
                JavaScriptObfuscatorCLI.encoding
            )
        );
    }

    /**
     * @param filePath
     */
    private static isFilePath (filePath: string): boolean {
        try {
            return fs.statSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    }

    /**
     * @param value
     * @returns {boolean}
     */
    private static parseBoolean (value: string): boolean {
        return value === 'true' || value === '1';
    }

    public run (): void {
        this.configureCommands();

        if (!this.arguments.length || Utils.arrayContains(this.arguments, '--help')) {
            this.commands.outputHelp();

            return;
        }

        this.inputPath = this.getInputPath();

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
            .option('--sourceMapMode [separate, inline]', 'Create a separate files with code and source map or combine them into a single file')
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
        this.data = fs.readFileSync(this.inputPath, JavaScriptObfuscatorCLI.encoding);
    }

    /**
     * @returns {string}
     */
    private getInputPath (): string {
        let inputPath: string = this.arguments[0];

        if (!JavaScriptObfuscatorCLI.isFilePath(inputPath)) {
            throw new ReferenceError(`First argument must be a valid file path`);
        }

        if (!Utils.arrayContains(JavaScriptObfuscatorCLI.availableInputExtensions, path.extname(inputPath))) {
            throw new ReferenceError(`Input file must have .js extension`);
        }

        return inputPath;
    }

    /**
     * @returns {string}
     */
    private getOutputCodePath (): string {
        let outputPath: string = (<any>this.commands).output;

        if (outputPath) {
            return outputPath;
        }

        return this.inputPath
            .split('.')
            .map<string>((value: string, index: number) => {
                return index === 0 ? `${value}-obfuscated` : value;
            })
            .join('.');
    }

    /**
     * @returns {string}
     */
    private getOutputSourceMapPath (outputCodePath: string): string {
        return outputCodePath
            .split('.')
            .map<string>((value: string, index: number, array: string[]) => {
                return index === array.length - 1 ? `${value}.map` : value;
            })
            .join('.');
    }

    private processData (): void {
        let outputCodePath: string = this.getOutputCodePath(),
            outputSourceMapPath: string = this.getOutputSourceMapPath(outputCodePath),
            dirName: string = path.dirname(outputCodePath),
            options: IOptionsPreset = this.buildOptions();

        mkdirp.sync(dirName);

        JavaScriptObfuscator.obfuscate(this.data, options);

        if (options.sourceMap && options.sourceMapMode === SourceMapMode.Separate) {
            JavaScriptObfuscator.obfuscatedCode = SourceMapInjector.appendSourceMapUrlToSourceCode(
                JavaScriptObfuscator.obfuscatedCode,
                [...outputSourceMapPath.split('/')].pop()
            );

            fs.writeFileSync(
                outputSourceMapPath,
                JavaScriptObfuscator.sourceMap,
                {
                    encoding: JavaScriptObfuscatorCLI.encoding
                }
            );
        }

        fs.writeFileSync(
            outputCodePath,
            JavaScriptObfuscator.obfuscatedCode,
            {
                encoding: JavaScriptObfuscatorCLI.encoding
            }
        );
    }
}
