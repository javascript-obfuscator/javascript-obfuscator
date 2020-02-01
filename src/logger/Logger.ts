import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import chalk, { Chalk } from 'chalk';

import { ILogger } from '../interfaces/logger/ILogger';
import { IOptions } from '../interfaces/options/IOptions';

import { LoggingMessage } from '../enums/logger/LoggingMessage';
import { LoggingPrefix } from '../enums/logger/LoggingPrefix';

@injectable()
export class Logger implements ILogger {
    /**
     * @type {Chalk}
     */
    public static readonly colorInfo: Chalk = chalk.cyan;

    /**
     * @type {Chalk}
     */
    public static readonly colorSuccess: Chalk = chalk.green;

    /**
     * @type {Chalk}
     */
    public static readonly colorWarn: Chalk = chalk.yellow;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @param {Chalk} loggingLevelColor
     * @param {LoggingPrefix} loggingPrefix
     * @param {string} loggingMessage
     * @param {string | number} value
     */
    public static log (
        loggingLevelColor: Chalk,
        loggingPrefix: LoggingPrefix,
        loggingMessage: string,
        value?: string | number,
    ): void {
        const processedMessage: string = loggingLevelColor(`\n${loggingPrefix} ${loggingMessage}`);

        console.log(processedMessage, value ?? '');
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public info (loggingMessage: LoggingMessage, value?: string | number): void {
        if (!this.options.log) {
            return;
        }

        Logger.log(Logger.colorInfo, LoggingPrefix.Base, loggingMessage, value);
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public success (loggingMessage: LoggingMessage, value?: string | number): void {
        if (!this.options.log) {
            return;
        }

        Logger.log(Logger.colorSuccess, LoggingPrefix.Base, loggingMessage, value);
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public warn (loggingMessage: LoggingMessage, value?: string | number): void {
        if (!this.options.log) {
            return;
        }

        Logger.log(Logger.colorWarn, LoggingPrefix.Base, loggingMessage, value);
    }
}
