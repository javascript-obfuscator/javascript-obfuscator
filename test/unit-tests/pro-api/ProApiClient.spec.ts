import 'reflect-metadata';

import { assert } from 'chai';
import * as sinon from 'sinon';

import { ProApiClient } from '../../../src/pro-api/ProApiClient';
import { IProApiConfig } from '../../../src/interfaces/pro-api/IProApiClient';
import { ApiError } from '../../../src/pro-api/ApiError';

describe('ProApiClient', () => {
    const API_URL = 'https://obfuscator.io/api/v1/obfuscate';

    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
        fetchStub = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
        fetchStub.restore();
    });

    describe('hasProFeatures', () => {
        describe('Variant #1: vmObfuscation enabled', () => {
            it('should return true when vmObfuscation is true', () => {
                const result = ProApiClient.hasProFeatures({ vmObfuscation: true });

                assert.isTrue(result);
            });
        });

        describe('Variant #2: parseHtml enabled', () => {
            it('should return true when parseHtml is true', () => {
                const result = ProApiClient.hasProFeatures({ parseHtml: true });

                assert.isTrue(result);
            });
        });

        describe('Variant #3: both features enabled', () => {
            it('should return true when both vmObfuscation and parseHtml are true', () => {
                const result = ProApiClient.hasProFeatures({
                    vmObfuscation: true,
                    parseHtml: true
                });

                assert.isTrue(result);
            });
        });

        describe('Variant #4: no Pro features enabled', () => {
            it('should return false when neither vmObfuscation nor parseHtml is true', () => {
                const result = ProApiClient.hasProFeatures({ compact: true });

                assert.isFalse(result);
            });
        });

        describe('Variant #5: features explicitly set to false', () => {
            it('should return false when vmObfuscation and parseHtml are false', () => {
                const result = ProApiClient.hasProFeatures({
                    vmObfuscation: false,
                    parseHtml: false
                });

                assert.isFalse(result);
            });
        });

        describe('Variant #6: empty options', () => {
            it('should return false for empty options', () => {
                const result = ProApiClient.hasProFeatures({});

                assert.isFalse(result);
            });
        });
    });

    describe('constructor', () => {
        describe('Variant #1: basic configuration', () => {
            it('should create client with required apiToken', () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };

                const client = new ProApiClient(config);

                assert.isDefined(client);
            });
        });

        describe('Variant #2: configuration with all options', () => {
            it('should create client with all configuration options', () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token',
                    timeout: 60000,
                    version: '5.0.0-beta.20'
                };

                const client = new ProApiClient(config);

                assert.isDefined(client);
            });
        });
    });

    describe('obfuscate', () => {
        describe('Variant #1: Pro features validation', () => {
            it('should throw ApiError when no Pro features are enabled', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                try {
                    await client.obfuscate('const a = 1;', { compact: true });
                    assert.fail('Should have thrown ApiError');
                } catch (error) {
                    assert.instanceOf(error, ApiError);
                    assert.include((error as ApiError).message, 'Pro');
                }
            });

            it('should not throw when only parseHtml is enabled', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'obfuscated', sourceMap: '' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                const result = await client.obfuscate('const a = 1;', { parseHtml: true });

                assert.isDefined(result);
            });
        });

        describe('Variant #2: URL without version parameter', () => {
            it('should call API without version query parameter when version is not specified', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'obfuscated', sourceMap: '' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                await client.obfuscate('const a = 1;', { vmObfuscation: true });

                assert.isTrue(fetchStub.calledOnce);
                const calledUrl = fetchStub.firstCall.args[0];
                assert.strictEqual(calledUrl, API_URL);
            });
        });

        describe('Variant #3: URL with version parameter', () => {
            it('should call API with version query parameter when version is specified', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token',
                    version: '5.0.0-beta.20'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'obfuscated', sourceMap: '' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                await client.obfuscate('const a = 1;', { vmObfuscation: true });

                assert.isTrue(fetchStub.calledOnce);
                const calledUrl = fetchStub.firstCall.args[0];
                assert.strictEqual(calledUrl, `${API_URL}?version=5.0.0-beta.20`);
            });
        });

        describe('Variant #4: version parameter encoding', () => {
            it('should properly encode version parameter in URL', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token',
                    version: '5.0.0-beta.22'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'obfuscated', sourceMap: '' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                await client.obfuscate('const a = 1;', { vmObfuscation: true });

                assert.isTrue(fetchStub.calledOnce);
                const calledUrl = fetchStub.firstCall.args[0];
                // encodeURIComponent('5.0.0-beta.22') === '5.0.0-beta.22' (no special chars)
                assert.strictEqual(calledUrl, `${API_URL}?version=5.0.0-beta.22`);
            });
        });

        describe('Variant #5: authorization header', () => {
            it('should include Authorization header with Bearer token', async () => {
                const config: IProApiConfig = {
                    apiToken: 'my-secret-token',
                    version: '5.0.0-beta.15'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'obfuscated', sourceMap: '' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                await client.obfuscate('const a = 1;', { vmObfuscation: true });

                assert.isTrue(fetchStub.calledOnce);
                const calledOptions = fetchStub.firstCall.args[1];
                assert.strictEqual(calledOptions.headers['Authorization'], 'Bearer my-secret-token');
            });
        });

        describe('Variant #6: successful obfuscation result', () => {
            it('should return obfuscation result with code and sourceMap', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token',
                    version: '5.0.0-beta.20'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'var _0x123=1;', sourceMap: '{"version":3}' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                const result = await client.obfuscate('const a = 1;', { vmObfuscation: true });

                assert.strictEqual(result.getObfuscatedCode(), 'var _0x123=1;');
                assert.strictEqual(result.getSourceMap(), '{"version":3}');
            });
        });

        describe('Variant #7: chunked response', () => {
            it('should reassemble chunked response correctly', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token',
                    version: '5.0.0-beta.10'
                };
                const client = new ProApiClient(config);

                const chunks = [
                    JSON.stringify({ type: 'progress', message: 'Processing...' }),
                    JSON.stringify({ type: 'chunk', field: 'code', data: 'var _0x', index: 0, total: 2 }),
                    JSON.stringify({ type: 'chunk', field: 'code', data: '123=1;', index: 1, total: 2 }),
                    JSON.stringify({ type: 'chunk_end', sourceMap: '' })
                ].join('\n');

                const mockResponse = new Response(chunks, { status: 200 });
                fetchStub.resolves(mockResponse);

                const result = await client.obfuscate('const a = 1;', { vmObfuscation: true });

                assert.strictEqual(result.getObfuscatedCode(), 'var _0x123=1;');
            });
        });

        describe('Variant #8: API error response', () => {
            it('should throw ApiError when API returns error message', async () => {
                const config: IProApiConfig = {
                    apiToken: 'invalid-token',
                    version: '5.0.0-beta.20'
                };
                const client = new ProApiClient(config);

                const mockResponse = new Response(
                    JSON.stringify({ type: 'error', message: 'Invalid API token' }),
                    { status: 401 }
                );
                fetchStub.resolves(mockResponse);

                try {
                    await client.obfuscate('const a = 1;', { vmObfuscation: true });
                    assert.fail('Should have thrown ApiError');
                } catch (error) {
                    assert.instanceOf(error, ApiError);
                    assert.include((error as ApiError).message, 'Invalid API token');
                }
            });
        });

        describe('Variant #9: progress callback', () => {
            it('should call progress callback for progress messages', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token',
                    version: '5.0.0-beta.20'
                };
                const client = new ProApiClient(config);

                const progressMessages: string[] = [];
                const onProgress = (message: string) => {
                    progressMessages.push(message);
                };

                const chunks = [
                    JSON.stringify({ type: 'progress', message: 'Validating...' }),
                    JSON.stringify({ type: 'progress', message: 'Obfuscating...' }),
                    JSON.stringify({ type: 'result', code: 'var a=1;', sourceMap: '' })
                ].join('\n');

                const mockResponse = new Response(chunks, { status: 200 });
                fetchStub.resolves(mockResponse);

                await client.obfuscate('const a = 1;', { vmObfuscation: true }, onProgress);

                assert.deepEqual(progressMessages, ['Validating...', 'Obfuscating...']);
            });
        });

        describe('Variant #10: client-side blob upload for large files', () => {
            const UPLOAD_TOKEN_URL = 'https://obfuscator.io/api/v1/upload/token';
            const BLOB_UPLOAD_THRESHOLD = 4.4 * 1024 * 1024;

            it('should use direct upload for small files', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);
                const smallCode = 'const a = 1;';

                const mockResponse = new Response(
                    JSON.stringify({ type: 'result', code: 'obfuscated', sourceMap: '' }),
                    { status: 200 }
                );
                fetchStub.resolves(mockResponse);

                await client.obfuscate(smallCode, { vmObfuscation: true });

                assert.isTrue(fetchStub.calledOnce);
                const calledUrl = fetchStub.firstCall.args[0];
                assert.strictEqual(calledUrl, API_URL);
            });

            it('should request upload token for large files', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const largeCode = 'a'.repeat(BLOB_UPLOAD_THRESHOLD + 1000);

                // First call is to get upload token
                const tokenResponse = new Response(
                    JSON.stringify({ clientToken: 'mock-client-token' }),
                    { status: 200 }
                );

                fetchStub.onFirstCall().resolves(tokenResponse);

                try {
                    await client.obfuscate(largeCode, { vmObfuscation: true });
                } catch {
                    // Will fail when trying to import @vercel/blob, but token request should succeed
                }

                // First call should be to upload token endpoint
                const firstCallUrl = fetchStub.firstCall.args[0];
                assert.strictEqual(firstCallUrl, UPLOAD_TOKEN_URL);

                // Should include authorization header
                const firstCallOptions = fetchStub.firstCall.args[1];
                assert.include(firstCallOptions.headers['Authorization'], 'Bearer test-token');
            });

            it('should throw ApiError when token request fails', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const largeCode = 'a'.repeat(BLOB_UPLOAD_THRESHOLD + 1000);

                const tokenErrorResponse = new Response(
                    JSON.stringify({ error: 'Invalid API key' }),
                    { status: 401 }
                );

                fetchStub.resolves(tokenErrorResponse);

                try {
                    await client.obfuscate(largeCode, { vmObfuscation: true });
                    assert.fail('Should have thrown ApiError');
                } catch (error) {
                    assert.instanceOf(error, ApiError);
                    assert.include((error as ApiError).message, 'Invalid API key');
                }
            });

            it('should throw ApiError when no client token is returned', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const largeCode = 'a'.repeat(BLOB_UPLOAD_THRESHOLD + 1000);

                const tokenResponse = new Response(
                    JSON.stringify({}),
                    { status: 200 }
                );

                fetchStub.resolves(tokenResponse);

                try {
                    await client.obfuscate(largeCode, { vmObfuscation: true });
                    assert.fail('Should have thrown ApiError');
                } catch (error) {
                    assert.instanceOf(error, ApiError);
                    assert.include((error as ApiError).message, 'No client token');
                }
            });

            it('should throw helpful error when @vercel/blob is not installed', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const largeCode = 'a'.repeat(BLOB_UPLOAD_THRESHOLD + 1000);

                // Token request succeeds
                const tokenResponse = new Response(
                    JSON.stringify({ clientToken: 'mock-client-token' }),
                    { status: 200 }
                );

                fetchStub.resolves(tokenResponse);

                try {
                    await client.obfuscate(largeCode, { vmObfuscation: true });
                    assert.fail('Should have thrown ApiError');
                } catch (error) {
                    assert.instanceOf(error, ApiError);
                    assert.include((error as ApiError).message, '@vercel/blob');
                }
            });
        });
    });
});
