import 'reflect-metadata';

import { JavaScriptObfuscatorCLI } from './cli/JavaScriptObfuscatorCLI';

class JavaScriptObfuscatorCLIFacade {
    /**
     * @param {string[]} argv
     */
    public static async obfuscate(argv: string[]): Promise<void> {
        const javaScriptObfuscatorCLI: JavaScriptObfuscatorCLI = new JavaScriptObfuscatorCLI(argv);

        javaScriptObfuscatorCLI.initialize();

        return javaScriptObfuscatorCLI.run();
    }
}

export { JavaScriptObfuscatorCLIFacade as JavaScriptObfuscatorCLI };
