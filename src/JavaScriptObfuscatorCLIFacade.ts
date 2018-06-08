import 'reflect-metadata';

import { JavaScriptObfuscatorCLI } from './cli/JavaScriptObfuscatorCLI';

class JavaScriptObfuscatorCLIFacade {
    /**
     * @param {string[]} argv
     */
    public static obfuscate (argv: string[]): void {
        const javaScriptObfuscatorCLI: JavaScriptObfuscatorCLI = new JavaScriptObfuscatorCLI(argv);

        javaScriptObfuscatorCLI.initialize();
        javaScriptObfuscatorCLI.run();
    }
}

export { JavaScriptObfuscatorCLIFacade as JavaScriptObfuscatorCLI };
