import { assert } from 'chai';

import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

const heapValueToMB = (value: number) => Math.round(value / 1024 / 1024 * 100) / 100;

describe('JavaScriptObfuscator memory', function () {
    const iterationsCount: number = 500;
    const gcDiffThreshold: number = 10;
    const allowedHeapDiffThreshold: number = 40;

    this.timeout(100000);

    describe('memory: heap usage', () => {
        it('should keep heap usage without memory leaks', () => {
            const sourceCode: string = readFileAsString('./test/fixtures/sample.js');

            const maxHeapUsed: number[] = [];
            let prevHeapUsed: number | null = null;

            for (let i: number = 0; i < iterationsCount; i++) {
                JavaScriptObfuscator.obfuscate(
                    sourceCode,
                    {
                        compact: true,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 0.75,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        debugProtection: false,
                        debugProtectionInterval: false,
                        disableConsoleOutput: true,
                        identifierNamesGenerator: 'mangled',
                        log: false,
                        renameGlobals: false,
                        rotateStringArray: true,
                        selfDefending: true,
                        shuffleStringArray: true,
                        splitStrings: true,
                        splitStringsChunkLength: 2,
                        stringArray: true,
                        stringArrayEncoding: 'base64',
                        stringArrayThreshold: 0.75,
                        transformObjectKeys: true,
                        unicodeEscapeSequence: false
                    }
                );

                const heap = process.memoryUsage();
                const heapUsed: number = heapValueToMB(heap.heapUsed);

                const gcDiff: number = (prevHeapUsed ?? heapUsed) - heapUsed;

                if (prevHeapUsed && gcDiff > gcDiffThreshold) {
                    maxHeapUsed.push(prevHeapUsed);
                }

                prevHeapUsed = heapUsed;
            }

            const sortedMaxHeapUsed: number[] = [...maxHeapUsed].sort((a: number, b: number) => a - b);

            const firstMaxHeapMBUsed: number = sortedMaxHeapUsed[0];
            const lastMaxHeapMbUsed: number = sortedMaxHeapUsed[sortedMaxHeapUsed.length - 1];

            const diff: number = lastMaxHeapMbUsed - firstMaxHeapMBUsed;

            assert.closeTo(diff, 0, allowedHeapDiffThreshold);
        });
    });
});
