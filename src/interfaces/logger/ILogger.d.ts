import { LoggingMessage } from '../../enums/logger/LoggingMessage';

export interface ILogger {
    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    info (loggingMessage: LoggingMessage, value?: string | number): void;

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    success (loggingMessage: LoggingMessage, value?: string | number): void;

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    warn (loggingMessage: LoggingMessage, value?: string | number): void;
}
