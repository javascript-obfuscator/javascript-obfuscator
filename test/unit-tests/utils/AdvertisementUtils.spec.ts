import { assert } from 'chai';

import { AdvertisementUtils } from '../../../src/utils/AdvertisementUtils';

describe('AdvertisementUtils', () => {
    describe('isCI', () => {
        const originalEnv = { ...process.env };

        afterEach(() => {
            // Restore original environment
            process.env = { ...originalEnv };
        });

        describe('Variant #1: CI environment variable set', () => {
            it('should return true when CI=true', () => {
                process.env.CI = 'true';
                assert.isTrue(AdvertisementUtils.isCI());
            });

            it('should return true when CI=1', () => {
                process.env.CI = '1';
                assert.isTrue(AdvertisementUtils.isCI());
            });

            it('should return true when GITHUB_ACTIONS is set', () => {
                process.env.GITHUB_ACTIONS = 'true';
                assert.isTrue(AdvertisementUtils.isCI());
            });

            it('should return true when TRAVIS is set', () => {
                process.env.TRAVIS = 'true';
                assert.isTrue(AdvertisementUtils.isCI());
            });

            it('should return true when GITLAB_CI is set', () => {
                process.env.GITLAB_CI = 'true';
                assert.isTrue(AdvertisementUtils.isCI());
            });

            it('should return true when JENKINS_URL is set', () => {
                process.env.JENKINS_URL = 'http://jenkins.example.com';
                assert.isTrue(AdvertisementUtils.isCI());
            });
        });

        describe('Variant #2: CI environment variable not set or false', () => {
            beforeEach(() => {
                // Clear all CI-related env vars
                delete process.env.CI;
                delete process.env.CONTINUOUS_INTEGRATION;
                delete process.env.GITHUB_ACTIONS;
                delete process.env.GITLAB_CI;
                delete process.env.TRAVIS;
                delete process.env.CIRCLECI;
                delete process.env.JENKINS_URL;
                delete process.env.BUILDKITE;
                delete process.env.TF_BUILD;
            });

            it('should return false when no CI env vars are set', () => {
                assert.isFalse(AdvertisementUtils.isCI());
            });

            it('should return false when CI=false', () => {
                process.env.CI = 'false';
                assert.isFalse(AdvertisementUtils.isCI());
            });

            it('should return false when CI=0', () => {
                process.env.CI = '0';
                assert.isFalse(AdvertisementUtils.isCI());
            });

            it('should return false when CI is empty string', () => {
                process.env.CI = '';
                assert.isFalse(AdvertisementUtils.isCI());
            });
        });
    });

    describe('shouldShowAdvertisement', () => {
        const originalEnv = { ...process.env };
        const originalIsTTY = process.stdout.isTTY;

        afterEach(() => {
            process.env = { ...originalEnv };
            process.stdout.isTTY = originalIsTTY;
        });

        describe('Variant #1: non-TTY environment', () => {
            it('should return false when stdout is not a TTY', () => {
                process.stdout.isTTY = false;
                // Clear CI env vars
                delete process.env.CI;
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement());
            });
        });

        describe('Variant #2: CI environment', () => {
            it('should return false in CI environment', () => {
                process.stdout.isTTY = true;
                process.env.CI = 'true';
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement());
            });
        });

        describe('Variant #3: display counter and reset', () => {
            let config: any;

            before(() => {
                // Get config instance using eval('require') - same as AdvertisementUtils
                // conf is an ES Module, so we need to access .default
                // eslint-disable-next-line no-eval
                const Conf = eval('require')('conf').default;
                config = new Conf({ projectName: 'javascript-obfuscator' });
            });

            beforeEach(() => {
                // Clear ad-related config before each test
                config.delete('adDisplayCount');
                config.delete('adFirstDisplayTime');
                // Reset cached config in AdvertisementUtils
                (AdvertisementUtils as any).config = null;
                // Ensure TTY and non-CI environment
                process.stdout.isTTY = true;
                delete process.env.CI;
                delete process.env.GITHUB_ACTIONS;
                delete process.env.TRAVIS;
                delete process.env.GITLAB_CI;
            });

            afterEach(() => {
                // Clean up
                config.delete('adDisplayCount');
                config.delete('adFirstDisplayTime');
                (AdvertisementUtils as any).config = null;
            });

            it('should return true for first 5 calls', () => {
                for (let i = 0; i < 5; i++) {
                    assert.isTrue(AdvertisementUtils.shouldShowAdvertisement(), `Call ${i + 1} should return true`);
                }
            });

            it('should return false after 5 calls', () => {
                // Exhaust the counter
                for (let i = 0; i < 5; i++) {
                    AdvertisementUtils.shouldShowAdvertisement();
                }

                // 6th call should return false
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement());
            });

            it('should increment counter on each call', () => {
                AdvertisementUtils.shouldShowAdvertisement();
                assert.strictEqual(config.get('adDisplayCount'), 1);

                AdvertisementUtils.shouldShowAdvertisement();
                assert.strictEqual(config.get('adDisplayCount'), 2);

                AdvertisementUtils.shouldShowAdvertisement();
                assert.strictEqual(config.get('adDisplayCount'), 3);
            });

            it('should set first display timestamp on first call', () => {
                const beforeTime = Date.now();
                AdvertisementUtils.shouldShowAdvertisement();
                const afterTime = Date.now();

                const timestamp = config.get('adFirstDisplayTime');
                assert.isNumber(timestamp);
                assert.isAtLeast(timestamp, beforeTime);
                assert.isAtMost(timestamp, afterTime);
            });

            it('should reset counter after 3 days', () => {
                // Exhaust counter
                for (let i = 0; i < 5; i++) {
                    AdvertisementUtils.shouldShowAdvertisement();
                }
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement());

                // Simulate 3 days passing by setting old timestamp
                const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000 - 1000;
                config.set('adFirstDisplayTime', threeDaysAgo);
                // Reset cached config
                (AdvertisementUtils as any).config = null;

                // Should return true again after reset
                assert.isTrue(AdvertisementUtils.shouldShowAdvertisement());
                // Counter should be reset to 1
                assert.strictEqual(config.get('adDisplayCount'), 1);
            });

            it('should not reset counter before 3 days', () => {
                // Exhaust counter
                for (let i = 0; i < 5; i++) {
                    AdvertisementUtils.shouldShowAdvertisement();
                }

                // Simulate 2 days passing (less than 3 days)
                const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
                config.set('adFirstDisplayTime', twoDaysAgo);
                // Reset cached config
                (AdvertisementUtils as any).config = null;

                // Should still return false
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement());
            });
        });
    });
});
