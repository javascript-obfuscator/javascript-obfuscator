import * as commands from 'commander';
import * as fs from 'fs';
import { execSync } from "child_process";

import { IOptionsPreset } from "../interfaces/IOptionsPreset";

import { DEFAULT_PRESET } from "../preset-options/DefaultPreset";

import { JavaScriptObfuscator } from "../JavaScriptObfuscator";

export class JavaScriptObfuscatorCLI {
    /**
     * @type {BufferEncoding}
     */
    private static encoding: BufferEncoding = 'utf8';

    /**
     * @type {string}
     */
    private static packageName: string = 'javascript-obfuscator';

    /**
     * @type {string[]}
     */
    private arguments: string[];

    /**
     * @type {string[]}
     */
    private rawArguments: string[];

    /**
     * @type {string}
     */
    private data: string = '';

    /**
     * @type {string}
     */
    private inputPath: string;

    constructor (argv: string[]) {
        this.rawArguments = argv;
        this.arguments = this.rawArguments.slice(2);
    }

    /**
     * @returns {IOptionsPreset}
     */
    private static buildOptions (): IOptionsPreset {
        let options: IOptionsPreset = {},
            availableOptions: string[] = Object.keys(DEFAULT_PRESET);

        for (let option in commands) {
            if (!commands.hasOwnProperty(option)) {
                continue;
            }

            if (availableOptions.indexOf(option) === -1) {
                continue;
            }

            options[option] = (<any>commands)[option];
        }

        return Object.assign({}, DEFAULT_PRESET, options);
    }

    /**
     * @returns {string}
     */
    private static getBuildVersion (): string {
        return execSync(`npm info ${JavaScriptObfuscatorCLI.packageName} version`, {
            encoding: JavaScriptObfuscatorCLI.encoding
        });
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

        if (!this.arguments.length || this.arguments.indexOf('--help') >= 0) {
            commands.outputHelp();

            return;
        }

        this.inputPath = this.getInputPath();

        this.getData();
        this.processData();
    }

    private configureCommands (): void {
        commands
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
            .option('--unicodeArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', JavaScriptObfuscatorCLI.parseBoolean)
            .option('--unicodeArrayThreshold <number>', 'The probability that the literal string will be inserted into unicodeArray (Default: 0.8, Min: 0, Max: 1)', parseFloat)
            .option('--wrapUnicodeArrayCalls <boolean>', 'Disables usage of special access function instead of direct array call', JavaScriptObfuscatorCLI.parseBoolean)
            .parse(this.rawArguments);

        commands.on('--help', () => {
            let isWindows: boolean = process.platform === 'win32',
                commandName: string = isWindows ? 'type' : 'cat';

            console.log('  Examples:\n');
            console.log('    %> javascript-obfuscator < in.js > out.js');
            console.log(`    %> ${commandName} in1.js in2.js | javascript-obfuscator > out.js`);
            console.log('');

            process.exit();
        });
    }

    private getData (): void {
        this.data = fs.readFileSync(this.inputPath, JavaScriptObfuscatorCLI.encoding);
    }

    private getInputPath (): string {
        let inputPath: string = this.arguments[0];

        if (!JavaScriptObfuscatorCLI.isFilePath(inputPath)) {
            throw new ReferenceError(`First argument must be a valid file path`);
        }

        return inputPath;
    }

    /**
     * @returns {string}
     */
    private getOutputPath (): string {
        let outputPath: string = (<any>commands).output;

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

    private processData (): void {
        fs.writeFileSync(
            this.getOutputPath(),
            JavaScriptObfuscator.obfuscate(this.data, JavaScriptObfuscatorCLI.buildOptions()),
            {
                encoding: JavaScriptObfuscatorCLI.encoding
            }
        );
    }
}
