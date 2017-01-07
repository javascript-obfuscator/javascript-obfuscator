import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from '../../../src/interfaces/IJavaScriptObfsucator';
import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('JavaScriptObfuscatorInternal', () => {
    describe(`setSourceMapUrl (url: string)`, () => {
        let inversifyContainerFacade: IInversifyContainerFacade,
            javaScriptObfuscator: IJavaScriptObfuscator,
            obfuscationResult: IObfuscationResult,
            sourceMapUrl: string = 'test.js.map';

        it('should link obfuscated code with source map', () => {
            inversifyContainerFacade = new InversifyContainerFacade({
                ...NO_CUSTOM_NODES_PRESET,
                sourceMap: true,
                sourceMapFileName: sourceMapUrl
            });
            javaScriptObfuscator = inversifyContainerFacade
                .get<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator);

            obfuscationResult = javaScriptObfuscator.obfuscate('var test = 1;');

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapUrl}`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });

        it('should properly add base url to source map import inside obfuscated code if `sourceMapBaseUrl` is set', () => {
            const sourceMapBaseUrl: string = 'http://localhost:9000';

            inversifyContainerFacade = new InversifyContainerFacade({
                ...NO_CUSTOM_NODES_PRESET,
                sourceMap: true,
                sourceMapBaseUrl: sourceMapBaseUrl,
                sourceMapFileName: sourceMapUrl
            });
            javaScriptObfuscator = inversifyContainerFacade
                .get<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator);

            obfuscationResult = javaScriptObfuscator.obfuscate('var test = 1;');

            assert.match(
                obfuscationResult.getObfuscatedCode(),
                new RegExp(`sourceMappingURL=${sourceMapBaseUrl}/${sourceMapUrl}$`))
            ;
            assert.isOk(JSON.parse(obfuscationResult.getSourceMap()).mappings);
        });
    });
});
