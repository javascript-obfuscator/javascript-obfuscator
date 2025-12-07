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
     * Storage key for the display count
     */
    private static readonly storageKey: string = 'adDisplayCount';

    /**
     * Storage key for the timestamp of first display
     */
    private static readonly timestampKey: string = 'adFirstDisplayTime';

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
     * Cached conf instance
     */
    private static config: any = null;

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

        // Initialize config if needed
        const config = this.getConfig();

        if (!config) {
            return false;
        }

        // Check if reset period has passed (3 days)
        const firstDisplayTime = this.getFirstDisplayTime(config);
        const now = Date.now();

        if (firstDisplayTime && now - firstDisplayTime >= this.resetPeriodMs) {
            // Reset counter after 3 days
            this.resetDisplayData(config);
        }

        // Check display count
        const count = this.getDisplayCount(config);

        if (count >= this.maxDisplayCount) {
            return false;
        }

        // Set first display time if not set
        if (!firstDisplayTime || now - firstDisplayTime >= this.resetPeriodMs) {
            this.setFirstDisplayTime(config, now);
        }

        // Increment count for next time
        this.setDisplayCount(config, count + 1);

        return true;
    }

    /**
     * Check if running in Node.js environment
     */
    private static isNodeEnvironment(): boolean {
        return typeof process !== 'undefined' && process.versions?.node !== undefined;
    }

    /**
     * Get or create conf instance
     */
    private static getConfig(): any {
        if (this.config) {
            return this.config;
        }

        if (typeof window === 'undefined') {
            try {
                // Dynamic import to avoid bundling in browser
                // eslint-disable-next-line no-eval
                const Conf = eval('require')('conf').default;

                this.config = new Conf({
                    projectName: 'javascript-obfuscator'
                });

                return this.config;
            } catch {
                return null;
            }
        }

        return null;
    }

    /**
     * Get current display count from config
     */
    private static getDisplayCount(config: any): number {
        try {
            const count = config.get(this.storageKey, 0);

            return typeof count === 'number' ? count : 0;
        } catch {
            return 0;
        }
    }

    /**
     * Set display count in config
     */
    private static setDisplayCount(config: any, count: number): void {
        try {
            config.set(this.storageKey, count);
        } catch {
            // Ignore errors
        }
    }

    /**
     * Get first display timestamp from config
     */
    private static getFirstDisplayTime(config: any): number | null {
        try {
            const timestamp = config.get(this.timestampKey, null);

            return typeof timestamp === 'number' ? timestamp : null;
        } catch {
            return null;
        }
    }

    /**
     * Set first display timestamp in config
     */
    private static setFirstDisplayTime(config: any, timestamp: number): void {
        try {
            config.set(this.timestampKey, timestamp);
        } catch {
            // Ignore errors
        }
    }

    /**
     * Reset display data (count and timestamp)
     */
    private static resetDisplayData(config: any): void {
        try {
            config.delete(this.storageKey);
            config.delete(this.timestampKey);
        } catch {
            // Ignore errors
        }
    }
}
