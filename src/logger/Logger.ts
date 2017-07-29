import { injectable, inject, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as chalk from 'chalk';

import { IInitializable } from '../interfaces/IInitializable';
import { ILogger } from '../interfaces/logger/ILogger';
import { IOptions } from '../interfaces/options/IOptions';

import { LoggingMessage } from '../enums/logger/LoggingMessage';

import { initializable } from '../decorators/Initializable';

@injectable()
export class Logger implements ILogger, IInitializable {
    /**
     * @type {string}
     */
    private static readonly loggingPrefix: string = '[javascript-obfuscator]';

    /**
     * @type {ChalkChain}
     */
    @initializable()
    private colorInfo: chalk.ChalkChain;

    /**
     * @type {ChalkChain}
     */
    @initializable()
    private colorSuccess: chalk.ChalkChain;

    /**
     * @type {ChalkChain}
     */
    @initializable()
    private colorWarn: chalk.ChalkChain;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    @postConstruct()
    public initialize (): void {
        this.colorInfo = chalk.cyan;
        this.colorSuccess = chalk.green;
        this.colorWarn = chalk.yellow;
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public info (loggingMessage: LoggingMessage, value?: string | number): void {
        this.log(this.colorInfo, loggingMessage, value);
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public success (loggingMessage: LoggingMessage, value?: string | number): void {
        this.log(this.colorSuccess, loggingMessage, value);
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public warn (loggingMessage: LoggingMessage, value?: string | number): void {
        this.log(this.colorWarn, loggingMessage, value);
    }

    /**
     *
     * @param {ChalkChain} loggingLevelColor
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    private log (loggingLevelColor: chalk.ChalkChain, loggingMessage: LoggingMessage, value?: string | number): void {
        if (!this.options.log) {
            return;
        }

        const processedMessage: string = loggingLevelColor(`\n${Logger.loggingPrefix} ${loggingMessage}`);

        !value ? console.log(processedMessage) : console.log(processedMessage, value);
    }
}
