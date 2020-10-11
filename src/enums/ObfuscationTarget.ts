import { MakeEnum } from '../utils/TsEnum';

export const ObfuscationTarget: Readonly<{
    Browser: 'browser';
    BrowserNoEval: 'browser-no-eval';
    Node: 'node';
}> = MakeEnum({
    Browser: 'browser',
    BrowserNoEval: 'browser-no-eval',
    Node: 'node'
});
