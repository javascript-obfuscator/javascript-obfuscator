import { spawn, Thread, Worker } from 'threads/dist';

/**
 * @param {string} code
 * @param {(result: any, code: string) => void} resultCallback
 * @param {(error: Error, code: string) => void} errorCallback
 * @param {() => void} timeoutCallback
 * @param {number} waitTimeout
 * @returns {Promise<void>}
 */
export async function evaluateInWorker(
    code: string,
    resultCallback: (result: any, code: string) => void,
    errorCallback: (error: Error, code: string) => void,
    timeoutCallback: () => void,
    waitTimeout: number
): Promise<void> {
    const evaluationWorker = await spawn(new Worker('./workers/evaluation-worker'));

    const timeout = setTimeout(async () => {
        await Thread.terminate(evaluationWorker);
        timeoutCallback();
    }, waitTimeout);

    try {
        const result: string = await evaluationWorker.evaluate(code);

        resultCallback(result, code);
    } catch (error) {
        errorCallback(error, code);
    } finally {
        clearTimeout(timeout);
        await Thread.terminate(evaluationWorker);
    }
}