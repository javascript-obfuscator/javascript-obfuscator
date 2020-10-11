import { Utils } from '../utils/Utils';

export const ObfuscationTarget: Readonly<{
    Browser: 'browser';
    BrowserNoEval: 'browser-no-eval';
    Node: 'node';
}> = Utils.makeEnum({
    Browser: 'browser',
    BrowserNoEval: 'browser-no-eval',
    Node: 'node'
});
