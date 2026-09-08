import * as sinon from 'sinon';

import { assert } from 'chai';

import { AdvertisementUtils } from '../../../src/utils/AdvertisementUtils';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1448
//
describe('Issue #1448', () => {
    const code: string = 'var foo = 1;';

    describe('`advertisement` option', () => {
        let shouldShowAdvertisementStub: sinon.SinonStub,
            consoleLogStub: sinon.SinonStub;

        beforeEach(() => {
            shouldShowAdvertisementStub = sinon
                .stub(AdvertisementUtils, 'shouldShowAdvertisement')
                .callsFake((advertisement: boolean): boolean => advertisement);
            consoleLogStub = sinon.stub(console, 'log');
        });

        afterEach(() => {
            shouldShowAdvertisementStub.restore();
            consoleLogStub.restore();
        });

        describe('Variant #1: `advertisement` option is enabled by default', () => {
            let isAdvertisementShown: boolean, loggedMessage: string;

            beforeEach(() => {
                JavaScriptObfuscator.obfuscate(code);

                isAdvertisementShown = consoleLogStub.called;
                loggedMessage = isAdvertisementShown ? String(consoleLogStub.firstCall.args[0]) : '';
            });

            it('should show the advertisement message', () => {
                assert.isTrue(isAdvertisementShown);
            });

            it('should log the JavaScript Obfuscator Pro advertisement message', () => {
                assert.include(loggedMessage, 'JavaScript Obfuscator Pro');
            });
        });

        describe('Variant #2: `advertisement` option is set to `true`', () => {
            let isAdvertisementShown: boolean;

            beforeEach(() => {
                JavaScriptObfuscator.obfuscate(code, { advertisement: true });

                isAdvertisementShown = consoleLogStub.called;
            });

            it('should show the advertisement message', () => {
                assert.isTrue(isAdvertisementShown);
            });
        });

        describe('Variant #3: `advertisement` option is set to `false`', () => {
            let isAdvertisementShown: boolean;

            beforeEach(() => {
                JavaScriptObfuscator.obfuscate(code, { advertisement: false });

                isAdvertisementShown = consoleLogStub.called;
            });

            it('should not show the advertisement message', () => {
                assert.isFalse(isAdvertisementShown);
            });

            it('should pass the disabled `advertisement` flag to the display check', () => {
                assert.isTrue(shouldShowAdvertisementStub.calledWith(false));
            });
        });

        describe('Variant #4: `advertisement` option is enabled but display conditions are not met', () => {
            let isAdvertisementShown: boolean;

            beforeEach(() => {
                shouldShowAdvertisementStub.returns(false);

                JavaScriptObfuscator.obfuscate(code, { advertisement: true });

                isAdvertisementShown = consoleLogStub.called;
            });

            it('should not show the advertisement message', () => {
                assert.isFalse(isAdvertisementShown);
            });
        });

        describe('Variant #5: obfuscation of code that produces custom code helpers', () => {
            const stringHeavyCode: string = 'var foo = \'long string value for the array\'; console.log(foo);';

            let advertisementDisplayCount: number;

            beforeEach(() => {
                JavaScriptObfuscator.obfuscate(stringHeavyCode, {
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayWrappersCount: 1
                });

                advertisementDisplayCount = consoleLogStub
                    .getCalls()
                    .filter((call) =>
                        typeof call.args[0] === 'string' &&
                        call.args[0].includes('JavaScript Obfuscator Pro is now available')
                    ).length;
            });

            it('should show the advertisement message exactly once', () => {
                assert.strictEqual(advertisementDisplayCount, 1);
            });
        });
    });
});
