import * as commands from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as tty from 'tty';

import { IOptionsPreset } from "../interfaces/IOptionsPreset";

import { DEFAULT_PRESET } from "../preset-options/DefaultPreset";

import { JavaScriptObfuscator } from "../JavaScriptObfuscator";

export class JavaScriptObfuscatorCLI {
    /**
     * @type {string}
     */
    private data: string = '';

    constructor () {}

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
        let packageConfig: any = fs.readFileSync(
            path.join(
                path.dirname(
                    fs.realpathSync(process.argv[1])
                ),
                '../package.json'
            )
        );

        return JSON.parse(packageConfig).version;
    }

    /**
     * @returns {boolean}
     */
    private static isDataExist (): boolean {
        return !process.env.__DIRECT__ && !(<tty.ReadStream>process.stdin).isTTY;
    }

    /**
     * @param value
     * @returns {boolean}
     */
    private static parseBoolean (value: string): boolean {
        return value === 'true' || value === '1';
    }

    public run (): void {
        this.configureProcess();
        this.configureCommands();

        if (!JavaScriptObfuscatorCLI.isDataExist()) {
            commands.outputHelp();
        }
    }

    private configureCommands (): void {
        commands
            .version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version')
            .usage('[options] STDIN STDOUT')
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
            .parse(process.argv);

        commands.on('--help', () => {
            let isWindows: boolean = process.platform === 'win32';

            console.log('  Examples:\n');
            console.log('    %> javascript-obfuscator < in.js > out.js');

            if (isWindows) {
                console.log('    %> type in1.js in2.js | javascript-obfuscator > out.js');
            } else {
                console.log('    %> cat in1.js in2.js | javascript-obfuscator > out.js');
            }

            console.log('');

            process.exit();
        });
    }

    private configureProcess (): void {
        process.stdin.setEncoding('utf-8');

        process.stdin.on('readable', () => {
            let chunk: string;

            while (chunk = <string>process.stdin.read()) {
                this.data += chunk;
            }
        });

        process.stdin.on('end', this.processData);
    }

    private processData (): void {
        process.stdout.write(
            JavaScriptObfuscator.obfuscate(this.data, JavaScriptObfuscatorCLI.buildOptions())
        );
    }
}
