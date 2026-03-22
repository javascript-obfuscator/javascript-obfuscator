import { assert } from 'chai';

import { DomainLockRule } from '../../../src/options/normalizer-rules/DomainLockRule';
import { IOptions } from '../../../src/interfaces/options/IOptions';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1182
//
describe('Issue #1182', () => {
    describe('domainLock should be case-insensitive', () => {
        it('should normalize mixed-case domain to lowercase', () => {
            const options = DomainLockRule({
                domainLock: ['Example.COM']
            } as IOptions);

            assert.deepEqual(options.domainLock, ['example.com']);
        });

        it('should normalize domain with subdomain to lowercase', () => {
            const options = DomainLockRule({
                domainLock: ['.Example.COM']
            } as IOptions);

            assert.deepEqual(options.domainLock, ['.example.com']);
        });

        it('should normalize multiple mixed-case domains', () => {
            const options = DomainLockRule({
                domainLock: ['Foo.Bar.COM', 'EXAMPLE.ORG']
            } as IOptions);

            assert.deepEqual(options.domainLock, ['foo.bar.com', 'example.org']);
        });

        it('should not change already-lowercase domains', () => {
            const options = DomainLockRule({
                domainLock: ['example.com']
            } as IOptions);

            assert.deepEqual(options.domainLock, ['example.com']);
        });
    });
});
