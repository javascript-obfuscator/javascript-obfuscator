import * as fs from 'fs';
import * as path from 'path';

import { assert } from 'chai';

import { AdvertisementUtils } from '../../../src/utils/AdvertisementUtils';
import { Utils } from '../../../src/utils/Utils';

const envPaths = Utils.nodeRequire('env-paths').default;

describe('AdvertisementUtils', () => {
    const configPath = path.join(envPaths('javascript-obfuscator').config, 'config.json');

    function readConfig(): any {
        try {
            return JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch {
            return {};
        }
    }

    function writeConfig(data: any): void {
        fs.mkdirSync(path.dirname(configPath), { recursive: true });
        fs.writeFileSync(configPath, JSON.stringify(data));
    }

    function deleteConfig(): void {
        try {
            fs.unlinkSync(configPath);
        } catch {
            // Ignore
        }
    }

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
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement(true));
            });
        });

        describe('Variant #2: CI environment', () => {
            it('should return false in CI environment', () => {
                process.stdout.isTTY = true;
                process.env.CI = 'true';
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement(true));
            });
        });

        describe('Variant #3: display counter and reset', () => {
            beforeEach(() => {
                deleteConfig();
                // Reset cached config path
                (AdvertisementUtils as any).configPath = null;
                // Ensure TTY and non-CI environment
                process.stdout.isTTY = true;
                delete process.env.CI;
                delete process.env.GITHUB_ACTIONS;
                delete process.env.TRAVIS;
                delete process.env.GITLAB_CI;
            });

            afterEach(() => {
                deleteConfig();
                (AdvertisementUtils as any).configPath = null;
            });

            it('should return true for first 5 calls', () => {
                for (let i = 0; i < 5; i++) {
                    assert.isTrue(AdvertisementUtils.shouldShowAdvertisement(true), `Call ${i + 1} should return true`);
                }
            });

            it('should return false after 5 calls', () => {
                // Exhaust the counter
                for (let i = 0; i < 5; i++) {
                    AdvertisementUtils.shouldShowAdvertisement(true);
                }

                // 6th call should return false
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement(true));
            });

            it('should increment counter on each call', () => {
                AdvertisementUtils.shouldShowAdvertisement(true);
                assert.strictEqual(readConfig().adDisplayCount, 1);

                AdvertisementUtils.shouldShowAdvertisement(true);
                assert.strictEqual(readConfig().adDisplayCount, 2);

                AdvertisementUtils.shouldShowAdvertisement(true);
                assert.strictEqual(readConfig().adDisplayCount, 3);
            });

            it('should set first display timestamp on first call', () => {
                const beforeTime = Date.now();
                AdvertisementUtils.shouldShowAdvertisement(true);
                const afterTime = Date.now();

                const timestamp = readConfig().adFirstDisplayTime;
                assert.isNumber(timestamp);
                assert.isAtLeast(timestamp, beforeTime);
                assert.isAtMost(timestamp, afterTime);
            });

            it('should reset counter after 3 days', () => {
                // Exhaust counter
                for (let i = 0; i < 5; i++) {
                    AdvertisementUtils.shouldShowAdvertisement(true);
                }
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement(true));

                // Simulate 3 days passing by setting old timestamp
                const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000 - 1000;
                const data = readConfig();
                data.adFirstDisplayTime = threeDaysAgo;
                writeConfig(data);

                // Should return true again after reset
                assert.isTrue(AdvertisementUtils.shouldShowAdvertisement(true));
                // Counter should be reset to 1
                assert.strictEqual(readConfig().adDisplayCount, 1);
            });

            it('should not reset counter before 3 days', () => {
                // Exhaust counter
                for (let i = 0; i < 5; i++) {
                    AdvertisementUtils.shouldShowAdvertisement(true);
                }

                // Simulate 2 days passing (less than 3 days)
                const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
                const data = readConfig();
                data.adFirstDisplayTime = twoDaysAgo;
                writeConfig(data);

                // Should still return false
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement(true));
            });
        });

        describe('Variant #4: `advertisement` option is disabled', () => {
            beforeEach(() => {
                deleteConfig();
                (AdvertisementUtils as any).configPath = null;
                // Ensure conditions that would otherwise show the advertisement
                process.stdout.isTTY = true;
                delete process.env.CI;
                delete process.env.GITHUB_ACTIONS;
                delete process.env.TRAVIS;
                delete process.env.GITLAB_CI;
            });

            afterEach(() => {
                deleteConfig();
                (AdvertisementUtils as any).configPath = null;
            });

            it('should return false when `advertisement` is `false`, even if all other conditions are met', () => {
                assert.isFalse(AdvertisementUtils.shouldShowAdvertisement(false));
            });

            it('should not touch the display counter when `advertisement` is `false`', () => {
                AdvertisementUtils.shouldShowAdvertisement(false);
                assert.isUndefined(readConfig().adDisplayCount);
            });
        });
    });
});
