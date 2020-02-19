import { spawn, Thread, Worker } from 'threads/dist';

/**
 * @param {string} code
 * @returns {Promise<void>}
 */
export function evaluateInWorker(
    code: string,
    waitTimeout: number
): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
        const evaluationWorker = await spawn(new Worker('./workers/evaluation-worker'));

        const timeout = setTimeout(async () => {
            await Thread.terminate(evaluationWorker);
            resolve(null);
        }, waitTimeout);

        try {
            const result: string = await evaluationWorker.evaluate(code);

            clearTimeout(timeout);
            await Thread.terminate(evaluationWorker);

            resolve(result);
        } catch (error) {
            clearTimeout(timeout);
            await Thread.terminate(evaluationWorker);

            reject(error);
        }
    });
}