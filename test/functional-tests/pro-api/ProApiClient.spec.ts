import { assert } from 'chai';
import * as sinon from 'sinon';

import { ApiError } from '../../../src/pro-api/ApiError';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

describe('JavaScriptObfuscator.obfuscatePro', () => {
    let fetchStub: sinon.SinonStub;

    // Helper to create NDJSON streaming response
    const createNdjsonResponse = (messages: object[]): string => {
        return messages.map((msg) => JSON.stringify(msg)).join('\n');
    };

    // Mock fetch to redirect to our test server
    const mockFetch = (responseBody: string, statusCode: number = 200): void => {
        fetchStub = sinon.stub(global, 'fetch').callsFake(async () => {
            return {
                ok: statusCode >= 200 && statusCode < 300,
                status: statusCode,
                text: async () => responseBody
            } as Response;
        });
    };

    afterEach(() => {
        if (fetchStub) {
            fetchStub.restore();
        }
    });

    describe('validation', () => {
        it('should throw ApiError when no Pro features are enabled', async () => {
            try {
                await JavaScriptObfuscator.obfuscatePro(
                    'const a = 1;',
                    { vmObfuscation: false },
                    { apiToken: 'test-token' }
                );
                assert.fail('Should have thrown an error');
            } catch (error) {
                assert.instanceOf(error, ApiError);
                assert.include((error as ApiError).message, 'Pro');
                assert.equal((error as ApiError).statusCode, 400);
            }
        });

        it('should throw ApiError when options are empty', async () => {
            try {
                await JavaScriptObfuscator.obfuscatePro('const a = 1;', {}, { apiToken: 'test-token' });
                assert.fail('Should have thrown an error');
            } catch (error) {
                assert.instanceOf(error, ApiError);
                assert.include((error as ApiError).message, 'Pro');
            }
        });

        it('should accept vmObfuscation as a valid Pro feature', async () => {
            const obfuscatedCode = 'var _0x1234 = 1;';

            const responseBody = createNdjsonResponse([{ type: 'result', code: obfuscatedCode, sourceMap: '' }]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), obfuscatedCode);
        });

        it('should accept parseHtml as a valid Pro feature', async () => {
            const obfuscatedCode = 'var _0x1234 = 1;';

            const responseBody = createNdjsonResponse([{ type: 'result', code: obfuscatedCode, sourceMap: '' }]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { parseHtml: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), obfuscatedCode);
        });
    });

    describe('streaming response - direct result', () => {
        it('should handle direct result response', async () => {
            const obfuscatedCode = 'var _0x1234 = function() { return 1; };';
            const sourceMap = '{"version":3}';

            const responseBody = createNdjsonResponse([
                { type: 'progress', message: 'Starting obfuscation...' },
                { type: 'progress', message: 'Processing...' },
                { type: 'result', code: obfuscatedCode, sourceMap: sourceMap }
            ]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), obfuscatedCode);
            assert.equal(result.getSourceMap(), sourceMap);
        });

        it('should call progress callback for progress messages', async () => {
            const progressMessages: string[] = [];
            const obfuscatedCode = 'var _0x1234 = 1;';

            const responseBody = createNdjsonResponse([
                { type: 'progress', message: 'Step 1: Parsing' },
                { type: 'progress', message: 'Step 2: Transforming' },
                { type: 'progress', message: 'Step 3: Generating' },
                { type: 'result', code: obfuscatedCode, sourceMap: '' }
            ]);

            mockFetch(responseBody);

            await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' },
                (msg) => {
                    progressMessages.push(msg);
                }
            );

            assert.deepEqual(progressMessages, ['Step 1: Parsing', 'Step 2: Transforming', 'Step 3: Generating']);
        });
    });

    describe('streaming response - chunked result', () => {
        it('should handle chunked code response', async () => {
            const chunk1 = 'var _0x1234 = ';
            const chunk2 = 'function() { ';
            const chunk3 = 'return 1; };';
            const expectedCode = chunk1 + chunk2 + chunk3;

            const responseBody = createNdjsonResponse([
                { type: 'progress', message: 'Processing...' },
                { type: 'chunk', field: 'code', data: chunk1, index: 0, total: 3 },
                { type: 'chunk', field: 'code', data: chunk2, index: 1, total: 3 },
                { type: 'chunk', field: 'code', data: chunk3, index: 2, total: 3 },
                { type: 'chunk_end', sourceMap: '' }
            ]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), expectedCode);
        });

        it('should handle chunked code and sourceMap response', async () => {
            const codeChunk1 = 'var a = 1;';
            const codeChunk2 = 'var b = 2;';
            const mapChunk1 = '{"version":';
            const mapChunk2 = '3}';

            const responseBody = createNdjsonResponse([
                { type: 'chunk', field: 'code', data: codeChunk1, index: 0, total: 2 },
                { type: 'chunk', field: 'code', data: codeChunk2, index: 1, total: 2 },
                { type: 'chunk', field: 'sourceMap', data: mapChunk1, index: 0, total: 2 },
                { type: 'chunk', field: 'sourceMap', data: mapChunk2, index: 1, total: 2 },
                { type: 'chunk_end' }
            ]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), codeChunk1 + codeChunk2);
            assert.equal(result.getSourceMap(), mapChunk1 + mapChunk2);
        });

        it('should handle out-of-order chunks correctly', async () => {
            const chunk0 = 'first';
            const chunk1 = 'second';
            const chunk2 = 'third';

            const responseBody = createNdjsonResponse([
                { type: 'chunk', field: 'code', data: chunk2, index: 2, total: 3 },
                { type: 'chunk', field: 'code', data: chunk0, index: 0, total: 3 },
                { type: 'chunk', field: 'code', data: chunk1, index: 1, total: 3 },
                { type: 'chunk_end', sourceMap: '' }
            ]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), chunk0 + chunk1 + chunk2);
        });
    });

    describe('error handling', () => {
        it('should throw ApiError when API returns error message', async () => {
            const responseBody = createNdjsonResponse([
                { type: 'progress', message: 'Starting...' },
                { type: 'error', message: 'Invalid API token' }
            ]);

            mockFetch(responseBody, 401);

            try {
                await JavaScriptObfuscator.obfuscatePro(
                    'const a = 1;',
                    { vmObfuscation: true },
                    { apiToken: 'invalid-token' }
                );
                assert.fail('Should have thrown an error');
            } catch (error) {
                assert.instanceOf(error, ApiError);
                assert.equal((error as ApiError).message, 'Invalid API token');
            }
        });

        it('should throw ApiError when no result is received', async () => {
            const responseBody = createNdjsonResponse([{ type: 'progress', message: 'Processing...' }]);

            mockFetch(responseBody);

            try {
                await JavaScriptObfuscator.obfuscatePro(
                    'const a = 1;',
                    { vmObfuscation: true },
                    { apiToken: 'test-token' }
                );
                assert.fail('Should have thrown an error');
            } catch (error) {
                assert.instanceOf(error, ApiError);
                assert.include((error as ApiError).message, 'No result received');
            }
        });

        it('should skip invalid JSON lines in response', async () => {
            const obfuscatedCode = 'var a = 1;';
            const responseBody =
                '{"type":"progress","message":"Step 1"}\n' +
                'invalid json line\n' +
                `{"type":"result","code":"${obfuscatedCode}","sourceMap":""}`;

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), obfuscatedCode);
        });

        it('should handle timeout', async () => {
            fetchStub = sinon.stub(global, 'fetch').callsFake(async (url, options) => {
                // Simulate abort being called
                const signal = options?.signal as AbortSignal;
                if (signal) {
                    const error = new Error('The operation was aborted');
                    error.name = 'AbortError';
                    throw error;
                }
                return { ok: true, text: async () => '' } as Response;
            });

            try {
                await JavaScriptObfuscator.obfuscatePro(
                    'const a = 1;',
                    { vmObfuscation: true },
                    { apiToken: 'test-token', timeout: 1 }
                );
                assert.fail('Should have thrown an error');
            } catch (error) {
                assert.instanceOf(error, ApiError);
                assert.equal((error as ApiError).statusCode, 408);
                assert.include((error as ApiError).message, 'timeout');
            }
        });
    });

    describe('result interface', () => {
        it('should return result implementing IProObfuscationResult', async () => {
            const obfuscatedCode = 'var _0x1234 = 1;';
            const sourceMap = '{"version":3}';

            const responseBody = createNdjsonResponse([{ type: 'result', code: obfuscatedCode, sourceMap: sourceMap }]);

            mockFetch(responseBody);

            const result = await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(result.getObfuscatedCode(), obfuscatedCode);
            assert.equal(result.getSourceMap(), sourceMap);
            assert.isNull(result.getIdentifierNamesCache());
            assert.equal(result.toString(), obfuscatedCode);
        });
    });

    describe('request format', () => {
        it('should send correct headers', async () => {
            let capturedHeaders: HeadersInit | undefined;

            fetchStub = sinon.stub(global, 'fetch').callsFake(async (url, options) => {
                capturedHeaders = options?.headers;
                return {
                    ok: true,
                    status: 200,
                    text: async () => JSON.stringify({ type: 'result', code: 'var a;', sourceMap: '' })
                } as Response;
            });

            await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'my-api-token' }
            );

            const headers = capturedHeaders as Record<string, string>;
            assert.equal(headers['Content-Type'], 'application/json');
            assert.equal(headers['Accept'], 'application/x-ndjson');
            assert.equal(headers['Authorization'], 'Bearer my-api-token');
        });

        it('should send correct request body', async () => {
            let capturedBody: string | undefined;

            fetchStub = sinon.stub(global, 'fetch').callsFake(async (url, options) => {
                capturedBody = options?.body as string;
                return {
                    ok: true,
                    status: 200,
                    text: async () => JSON.stringify({ type: 'result', code: 'var a;', sourceMap: '' })
                } as Response;
            });

            await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true, compact: true, stringArray: false },
                { apiToken: 'test-token' }
            );

            const body = JSON.parse(capturedBody!);
            assert.equal(body.code, 'const a = 1;');
            assert.deepEqual(body.options, {
                vmObfuscation: true,
                compact: true,
                stringArray: false
            });
        });

        it('should use POST method', async () => {
            let capturedMethod: string | undefined;

            fetchStub = sinon.stub(global, 'fetch').callsFake(async (url, options) => {
                capturedMethod = options?.method;
                return {
                    ok: true,
                    status: 200,
                    text: async () => JSON.stringify({ type: 'result', code: 'var a;', sourceMap: '' })
                } as Response;
            });

            await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );

            assert.equal(capturedMethod, 'POST');
        });

        it('should include version in URL when specified', async () => {
            let capturedUrl: string | undefined;

            fetchStub = sinon.stub(global, 'fetch').callsFake(async (url, options) => {
                capturedUrl = url as string;
                return {
                    ok: true,
                    status: 200,
                    text: async () => JSON.stringify({ type: 'result', code: 'var a;', sourceMap: '' })
                } as Response;
            });

            await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token', version: '5.0.0-beta.20' }
            );

            assert.include(capturedUrl, 'version=5.0.0-beta.20');
        });
    });
});

describe('Browser environment', () => {
    it('should throw error when called in browser environment', async () => {
        // Simulate browser environment
        (global as any).window = {};

        try {
            await JavaScriptObfuscator.obfuscatePro(
                'const a = 1;',
                { vmObfuscation: true },
                { apiToken: 'test-token' }
            );
            assert.fail('Should have thrown an error');
        } catch (error) {
            assert.instanceOf(error, Error);
            assert.include((error as Error).message, 'Node.js');
        } finally {
            // Restore Node.js environment
            delete (global as any).window;
        }
    });
});

describe('ApiError', () => {
    it('should have correct properties', () => {
        const error = new ApiError('Test error', 500, '{"error": "details"}');

        assert.equal(error.message, 'Test error');
        assert.equal(error.statusCode, 500);
        assert.equal(error.response, '{"error": "details"}');
        assert.equal(error.name, 'ApiError');
        assert.instanceOf(error, Error);
    });

    it('should work without response parameter', () => {
        const error = new ApiError('Test error', 400);

        assert.equal(error.message, 'Test error');
        assert.equal(error.statusCode, 400);
        assert.isUndefined(error.response);
    });
});
