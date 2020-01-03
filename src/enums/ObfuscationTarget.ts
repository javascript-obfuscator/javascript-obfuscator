import { MakeEnum } from '@gradecam/tsenum';

export const ObfuscationTarget: Readonly<{
    Browser: 'browser';
    BrowserNoEval: 'browser-no-eval';
    Node: 'node';
}> = MakeEnum({
    Browser: 'browser',
    BrowserNoEval: 'browser-no-eval',
    Node: 'node'
});
