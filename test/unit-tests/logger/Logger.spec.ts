import 'reflect-metadata';

import { assert } from 'chai';
import * as sinon from 'sinon';

import chalk from 'chalk';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { ILogger } from '../../../src/interfaces/logger/ILogger';

import { LoggingPrefix } from '../../../src/enums/logger/LoggingPrefix';

import { Logger } from '../../../src/logger/Logger';
import { LoggingMessage } from '../../../src/enums/logger/LoggingMessage';

describe('Logger', () => {
    describe('log', () => {
        const loggingMessage: string = '[javascript-obfuscator] foo';
        const expectedConsoleLogCallResult: boolean = true;

        let consoleLogSpy: sinon.SinonSpy,
            consoleLogCallResult: boolean,
            loggingMessageResult: string;

        before(() => {
            consoleLogSpy = sinon.spy(console, 'log');
            Logger.log(chalk.cyan, LoggingPrefix.Base, 'foo');

            consoleLogCallResult = consoleLogSpy.called;
            loggingMessageResult = consoleLogSpy.getCall(0).args[0];
        });

        it('should call `console.log`', () => {
            assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
        });

        it('should log message to the console', () => {
            assert.include(loggingMessageResult, loggingMessage);
        });

        after(() => {
            consoleLogSpy.restore();
        });
    });

    describe('info', () => {
        describe('`log` option is enabled', () => {
            const loggingMessage: string = '[javascript-obfuscator] Obfuscation started...';
            const expectedConsoleLogCallResult: boolean = true;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade,
                loggingMessageResult: string;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', '', {
                    log: true
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.info(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
                loggingMessageResult = consoleLogSpy.getCall(0).args[0];
            });

            it('should call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            it('should log `info` message to the console', () => {
                assert.include(loggingMessageResult, loggingMessage);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });

        describe('`log` option is disabled', () => {
            const expectedConsoleLogCallResult: boolean = false;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', '', {
                    log: false
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.info(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
            });

            it('shouldn\'t call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });
    });

    describe('success', () => {
        describe('`log` option is enabled', () => {
            const loggingMessage: string = '[javascript-obfuscator] Obfuscation started...';
            const expectedConsoleLogCallResult: boolean = true;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade,
                loggingMessageResult: string;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', '', {
                    log: true
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.success(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
                loggingMessageResult = consoleLogSpy.getCall(0).args[0];
            });

            it('should call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            it('should log `success` message to the console', () => {
                assert.include(loggingMessageResult, loggingMessage);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });

        describe('`log` option is disabled', () => {
            const expectedConsoleLogCallResult: boolean = false;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', '', {
                    log: false
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.success(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
            });

            it('shouldn\'t call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });
    });

    describe('warn', () => {
        describe('`log` option is enabled', () => {
            const loggingMessage: string = '[javascript-obfuscator] Obfuscation started...';
            const expectedConsoleLogCallResult: boolean = true;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade,
                loggingMessageResult: string;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', '', {
                    log: true
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.warn(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
                loggingMessageResult = consoleLogSpy.getCall(0).args[0];
            });

            it('should call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            it('should log `warn` message to the console', () => {
                assert.include(loggingMessageResult, loggingMessage);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });

        describe('`log` option is disabled', () => {
            const expectedConsoleLogCallResult: boolean = false;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', '', {
                    log: false
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.warn(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
            });

            it('shouldn\'t call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });
    });
});
