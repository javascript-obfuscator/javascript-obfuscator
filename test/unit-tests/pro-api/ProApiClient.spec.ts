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

    describe('isBuiltInPreset', () => {
        describe('Variant #1: OSS preset names', () => {
            it('should return true for the presets the local obfuscator knows', () => {
                assert.isTrue(ProApiClient.isBuiltInPreset('default'));
                assert.isTrue(ProApiClient.isBuiltInPreset('low-obfuscation'));
                assert.isTrue(ProApiClient.isBuiltInPreset('medium-obfuscation'));
                assert.isTrue(ProApiClient.isBuiltInPreset('high-obfuscation'));
            });
        });

        describe('Variant #2: VM preset names', () => {
            it('should return true for the presets only the Pro API knows', () => {
                assert.isTrue(ProApiClient.isBuiltInPreset('vm-low-obfuscation'));
                assert.isTrue(ProApiClient.isBuiltInPreset('vm-default'));
                assert.isTrue(ProApiClient.isBuiltInPreset('vm-medium-obfuscation'));
                assert.isTrue(ProApiClient.isBuiltInPreset('vm-high-obfuscation'));
                assert.isTrue(ProApiClient.isBuiltInPreset('vm-ultra-high-obfuscation'));
                assert.isTrue(ProApiClient.isBuiltInPreset('vm-anti-llm'));
            });
        });

        describe('Variant #3: anything else', () => {
            it('should return false for a custom alias', () => {
                assert.isFalse(ProApiClient.isBuiltInPreset('production'));
            });

            it('should return false when no preset is set', () => {
                assert.isFalse(ProApiClient.isBuiltInPreset(undefined));
            });
        });
    });

    describe('fetchPreset', () => {
        const PRESETS_URL = 'https://obfuscator.io/api/v1/presets';

        const preset = {
            alias: 'production',
            name: 'Production',
            description: null,
            options: { vmObfuscation: true, optionsPreset: 'vm-default', compact: false },
            updatedAt: '2026-09-20T12:00:00.000Z'
        };

        const jsonResponse = (body: object, status: number): Response =>
            ({
                ok: status >= 200 && status < 300,
                status,
                text: async () => JSON.stringify(body)
            }) as Response;

        describe('Variant #1: request shape', () => {
            it('should GET the alias with the Bearer token', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse(preset, 200));

                await client.fetchPreset('production');

                assert.isTrue(fetchStub.calledOnce);
                assert.strictEqual(fetchStub.firstCall.args[0], `${PRESETS_URL}/production`);
                assert.strictEqual(fetchStub.firstCall.args[1].method, 'GET');
                assert.strictEqual(fetchStub.firstCall.args[1].headers['Authorization'], 'Bearer test-token');
            });

            it('should encode the alias in the URL', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse(preset, 200));

                await client.fetchPreset('prod build');

                assert.strictEqual(fetchStub.firstCall.args[0], `${PRESETS_URL}/prod%20build`);
            });
        });

        describe('Variant #2: found', () => {
            it('should return the preset', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse(preset, 200));

                const result = await client.fetchPreset('production');

                assert.deepEqual(result, preset);
            });
        });

        describe('Variant #3: not found', () => {
            it('should return null on 404', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse({ error: 'Preset not found' }, 404));

                const result = await client.fetchPreset('production');

                assert.isNull(result);
            });
        });

        describe('Variant #4: other errors', () => {
            it('should throw ApiError carrying the API message and status', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse({ error: 'Invalid or expired API key' }, 401));

                let error: ApiError | undefined;

                try {
                    await client.fetchPreset('production');
                } catch (caught) {
                    error = caught as ApiError;
                }

                assert.instanceOf(error, ApiError);
                assert.strictEqual(error!.message, 'Invalid or expired API key');
                assert.strictEqual(error!.statusCode, 401);
            });
        });

        describe('Variant #5: memoisation', () => {
            it('should request each alias once per client', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse(preset, 200));

                await client.fetchPreset('production');
                await client.fetchPreset('production');

                assert.isTrue(fetchStub.calledOnce);
            });
        });
    });

    describe('resolveOptions', () => {
        const preset = {
            alias: 'production',
            name: 'Production',
            description: null,
            options: { vmObfuscation: true, optionsPreset: 'vm-default', compact: false, selfDefending: true },
            updatedAt: '2026-09-20T12:00:00.000Z'
        };

        const jsonResponse = (body: object, status: number): Response =>
            ({
                ok: status >= 200 && status < 300,
                status,
                text: async () => JSON.stringify(body)
            }) as Response;

        describe('Variant #1: no preset', () => {
            it('should return the options untouched without a request', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });
                const options = { vmObfuscation: true, compact: true };

                const result = await client.resolveOptions(options);

                assert.deepEqual(result, options);
                assert.isFalse(fetchStub.called);
            });
        });

        describe('Variant #2: built-in preset', () => {
            it('should return the options untouched without a request', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });
                const options = { optionsPreset: 'vm-default', vmObfuscation: true };

                const result = await client.resolveOptions(options);

                assert.deepEqual(result, options);
                assert.isFalse(fetchStub.called);
            });
        });

        describe('Variant #3: custom preset', () => {
            it('should use the preset as the base and the caller options as overrides', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse(preset, 200));

                const result = await client.resolveOptions({ optionsPreset: 'production', compact: true });

                assert.deepEqual(result, {
                    // From the preset: its own built-in preset and VM flag survive.
                    vmObfuscation: true,
                    optionsPreset: 'vm-default',
                    selfDefending: true,
                    // From the caller: overrides the preset's `compact: false`.
                    compact: true
                });
            });

            it('should drop the alias when the preset carries no optionsPreset of its own', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse({ ...preset, options: { vmObfuscation: true } }, 200));

                const result = await client.resolveOptions({ optionsPreset: 'production' });

                assert.deepEqual(result, { vmObfuscation: true });
            });
        });

        describe('Variant #4: unknown custom preset', () => {
            it('should throw ApiError 404 naming the alias', async () => {
                const client = new ProApiClient({ apiToken: 'test-token' });

                fetchStub.resolves(jsonResponse({ error: 'Preset not found' }, 404));

                let error: ApiError | undefined;

                try {
                    await client.resolveOptions({ optionsPreset: 'prodction' });
                } catch (caught) {
                    error = caught as ApiError;
                }

                assert.instanceOf(error, ApiError);
                assert.strictEqual(error!.statusCode, 404);
                assert.include(error!.message, 'prodction');
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

                const mockResponse = new Response(JSON.stringify({ type: 'error', message: 'Invalid API token' }), {
                    status: 401
                });
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
            // Matches the server's inline cap: 4,400,000 bytes, just under
            // Vercel's 4.5 MB (decimal) request body limit
            const BLOB_UPLOAD_THRESHOLD = 4_400_000;

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
                const tokenResponse = new Response(JSON.stringify({ clientToken: 'mock-client-token' }), {
                    status: 200
                });

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

            it('should upload the raw source (not the JSON body) for large code', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const largeCode = 'a'.repeat(BLOB_UPLOAD_THRESHOLD + 1000);

                const tokenResponse = new Response(JSON.stringify({ clientToken: 'mock-client-token' }), {
                    status: 200
                });

                fetchStub.onFirstCall().resolves(tokenResponse);

                try {
                    await client.obfuscate(largeCode, { vmObfuscation: true });
                } catch {
                    // The blob PUT against the mock token fails; the token
                    // request that reveals the chosen format has already run.
                }

                // Raw format uploads the source file itself
                const tokenRequestBody = JSON.parse(fetchStub.firstCall.args[1].body);
                assert.strictEqual(tokenRequestBody.pathname, 'obfuscate-source.js');
            });

            it('should fall back to the legacy JSON-body format when options are oversized', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                // Small code, but options too large to travel inline in the
                // raw-format follow-up request
                const oversizedOptions = {
                    vmObfuscation: true,
                    reservedStrings: ['x'.repeat(BLOB_UPLOAD_THRESHOLD + 1000)]
                };

                const tokenResponse = new Response(JSON.stringify({ clientToken: 'mock-client-token' }), {
                    status: 200
                });

                fetchStub.onFirstCall().resolves(tokenResponse);

                try {
                    await client.obfuscate('const a = 1;', oversizedOptions);
                } catch {
                    // The blob PUT against the mock token fails; the token
                    // request that reveals the chosen format has already run.
                }

                // Legacy format uploads the whole JSON request body
                const tokenRequestBody = JSON.parse(fetchStub.firstCall.args[1].body);
                assert.strictEqual(tokenRequestBody.pathname, 'obfuscate-request.json');
            });

            it('should throw ApiError when token request fails', async () => {
                const config: IProApiConfig = {
                    apiToken: 'test-token'
                };
                const client = new ProApiClient(config);

                const largeCode = 'a'.repeat(BLOB_UPLOAD_THRESHOLD + 1000);

                const tokenErrorResponse = new Response(JSON.stringify({ error: 'Invalid API key' }), { status: 401 });

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

                const tokenResponse = new Response(JSON.stringify({}), { status: 200 });

                fetchStub.resolves(tokenResponse);

                try {
                    await client.obfuscate(largeCode, { vmObfuscation: true });
                    assert.fail('Should have thrown ApiError');
                } catch (error) {
                    assert.instanceOf(error, ApiError);
                    assert.include((error as ApiError).message, 'No client token');
                }
            });
        });
    });
});
