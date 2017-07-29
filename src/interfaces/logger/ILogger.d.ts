import { LoggingMessage } from '../../enums/logger/LoggingMessage';

export interface ILogger {
    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string} value
     */
    logInfo (loggingMessage: LoggingMessage, value?: string): void;

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string} value
     */
    logSuccess (loggingMessage: LoggingMessage, value?: string): void;
}
