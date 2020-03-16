import { assert } from 'chai';

import { Utils } from '../../../src/utils/Utils';

describe('Utils', () => {
    describe('extractDomainFrom', () => {
        describe('Variant #1: simple url', () => {
            const url: string = 'http://google.ru';
            const expectedDomain: string = 'google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFrom(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('Variant #2: url with `www` part', () => {
            const url: string = 'http://www.google.ru';
            const expectedDomain: string = 'www.google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFrom(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('Variant #3: url with `https` protocol and port', () => {
            const url: string = 'https://www.google.ru:9000';
            const expectedDomain: string = 'www.google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFrom(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('Variant #4: protocol-wide url and route', () => {
            const url: string = '//google.ru/abc';
            const expectedDomain: string = 'google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFrom(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('Variant #5: protocol-wide url, `localhost` and port', () => {
            const url: string = '//localhost:9000';
            const expectedDomain: string = 'localhost';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFrom(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });
    });

    describe('buildVersionMessage', () => {
        describe('Variant #1: version and build timestamp are set', () => {
            const expectedVersionMessage: string = '0.1.0_2020-01-01T00:00:00.000Z';

            let versionMessage: string;

            before(() => {
                versionMessage = Utils.buildVersionMessage('0.1.0', '1577836800000');
            });

            it('should build version message', () => {
                assert.equal(versionMessage, expectedVersionMessage);
            });
        });

        describe('Variant #2: version is not set set', () => {
            const expectedVersionMessage: string = 'unknown';

            let versionMessage: string;

            before(() => {
                versionMessage = Utils.buildVersionMessage(undefined, '1577836800000');
            });

            it('should build version message', () => {
                assert.equal(versionMessage, expectedVersionMessage);
            });
        });

        describe('Variant #3: build timestamp is not set set', () => {
            const expectedVersionMessage: string = 'unknown';

            let versionMessage: string;

            before(() => {
                versionMessage = Utils.buildVersionMessage('0.1.0', undefined);
            });

            it('should build version message', () => {
                assert.equal(versionMessage, expectedVersionMessage);
            });
        });
    });

    describe('getIdentifiersPrefixForMultipleSources', () => {
        describe('Variant #1: should get identifiers prefix for identifiers prefix from options', () => {
            const expectedIdentifiersPrefix: string = 'foo1';

            let identifiersPrefix: string;

            before(() => {
                identifiersPrefix = Utils.getIdentifiersPrefixForMultipleSources(
                    'foo',
                    1
                );
            });

            it('should return correct identifiers prefix', () => {
                assert.equal(identifiersPrefix, expectedIdentifiersPrefix);
            });
        });

        describe('Variant #2: should get identifiers prefix for base identifiers prefix for multiple sources', () => {
            const expectedIdentifiersPrefix: string = 'a1';

            let identifiersPrefix: string;

            before(() => {
                identifiersPrefix = Utils.getIdentifiersPrefixForMultipleSources(
                    undefined,
                    1
                );
            });

            it('should return correct identifiers prefix', () => {
                assert.equal(identifiersPrefix, expectedIdentifiersPrefix);
            });
        });
    });
});
