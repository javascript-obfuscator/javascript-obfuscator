import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import chalk, { Chalk } from 'chalk';

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
     * @type {Chalk}
     */
    @initializable()
    private colorInfo!: Chalk;

    /**
     * @type {Chalk}
     */
    @initializable()
    private colorSuccess!: Chalk;

    /**
     * @type {Chalk}
     */
    @initializable()
    private colorWarn!: Chalk;

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
     * @param {Chalk} loggingLevelColor
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    private log (loggingLevelColor: Chalk, loggingMessage: LoggingMessage, value?: string | number): void {
        if (!this.options.log) {
            return;
        }

        const processedMessage: string = loggingLevelColor(`\n${Logger.loggingPrefix} ${loggingMessage}`);

        !value ? console.log(processedMessage) : console.log(processedMessage, value);
    }
}
