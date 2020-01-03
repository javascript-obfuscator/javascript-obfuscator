import { MakeEnum } from '@gradecam/tsenum';

export const ObfuscationTarget: Readonly<{
    BrowserNoEval: string;
    Node: string;
    Browser: string;
}> = MakeEnum({
    Browser: 'browser',
    BrowserNoEval: 'browser-no-eval',
    Node: 'node'
});
