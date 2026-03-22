import { Utils } from './Utils';

interface IConfigData {
    adDisplayCount?: number;
    adFirstDisplayTime?: number;
}

/**
 * Utility class for managing PRO advertisement display
 * - Limits display to first N times
 * - Skips display in CI environments
 * - Only works in Node.js (returns false in browser)
 */
export class AdvertisementUtils {
    /**
     * Maximum number of times to show the advertisement
     */
    private static readonly maxDisplayCount: number = 5;

    /**
     * Reset period in milliseconds (3 days)
     */
    private static readonly resetPeriodMs: number = 3 * 24 * 60 * 60 * 1000;

    /**
     * Common CI environment variables to detect
     */
    private static readonly ciEnvVars: string[] = [
        'CI',
        'CONTINUOUS_INTEGRATION',
        'GITHUB_ACTIONS',
        'GITLAB_CI',
        'TRAVIS',
        'CIRCLECI',
        'JENKINS_URL',
        'HUDSON_URL',
        'TEAMCITY_VERSION',
        'BUILDKITE',
        'TF_BUILD', // Azure Pipelines
        'BITBUCKET_BUILD_NUMBER',
        'CODEBUILD_BUILD_ID', // AWS CodeBuild
        'DRONE',
        'HEROKU_TEST_RUN_ID',
        'NETLIFY',
        'VERCEL',
        'NOW_BUILDER', // Vercel (legacy)
        'RENDER',
        'CODESANDBOX_SSE',
        'STACKBLITZ'
    ];

    /**
     * Config directory name for env-paths
     */
    private static readonly projectName: string = 'javascript-obfuscator';

    /**
     * Cached config file path
     */
    private static configPath: string | null = null;

    /**
     * Check if running in a CI environment
     */
    public static isCI(): boolean {
        if (!this.isNodeEnvironment()) {
            return false;
        }

        return this.ciEnvVars.some((envVar) => {
            const value = process.env[envVar];

            return value !== undefined && value !== '' && value !== '0' && value !== 'false';
        });
    }

    /**
     * Check if advertisement should be displayed
     * Returns true if:
     * - Running in Node.js (not browser)
     * - Not in CI environment
     * - Display count is less than maxDisplayCount
     *
     * Also increments the display count if returning true
     *
     * In browser environments, always returns false
     */
    public static shouldShowAdvertisement(): boolean {
        // Don't show in browser - only Node.js CLI
        if (!this.isNodeEnvironment()) {
            return false;
        }

        // Don't show in CI environments
        if (this.isCI()) {
            return false;
        }

        if (!process.stdout.isTTY) {
            return false;
        }

        const data = this.readConfig();
        const now = Date.now();

        // Check if reset period has passed (3 days)
        if (data.adFirstDisplayTime && now - data.adFirstDisplayTime >= this.resetPeriodMs) {
            data.adDisplayCount = 0;
            data.adFirstDisplayTime = undefined;
        }

        const count = data.adDisplayCount ?? 0;

        if (count >= this.maxDisplayCount) {
            return false;
        }

        if (!data.adFirstDisplayTime) {
            data.adFirstDisplayTime = now;
        }

        data.adDisplayCount = count + 1;
        this.writeConfig(data);

        return true;
    }

    /**
     * Check if running in Node.js environment
     */
    private static isNodeEnvironment(): boolean {
        return typeof process !== 'undefined' && process.versions?.node !== undefined;
    }

    /**
     * Get the config file path
     */
    private static getConfigPath(): string {
        if (!this.configPath) {
            const envPaths = Utils.nodeRequire('env-paths').default;
            const fs = Utils.nodeRequire('fs');
            const path = Utils.nodeRequire('path');
            const configDir: string = envPaths(this.projectName).config;

            fs.mkdirSync(configDir, { recursive: true });
            this.configPath = path.join(configDir, 'config.json');
        }

        return this.configPath!;
    }

    /**
     * Read config data from disk
     */
    private static readConfig(): IConfigData {
        try {
            const fs = Utils.nodeRequire('fs');
            const raw = fs.readFileSync(this.getConfigPath(), 'utf8');

            return JSON.parse(raw);
        } catch {
            return {};
        }
    }

    /**
     * Write config data to disk
     */
    private static writeConfig(data: IConfigData): void {
        try {
            const fs = Utils.nodeRequire('fs');

            fs.writeFileSync(this.getConfigPath(), JSON.stringify(data));
        } catch {
            // Ignore errors
        }
    }
}
