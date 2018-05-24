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
});
