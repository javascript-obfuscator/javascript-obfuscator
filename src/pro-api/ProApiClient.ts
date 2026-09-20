import { TInputOptions } from '../types/options/TInputOptions';
import {
    IProApiConfig,
    IProApiStreamMessage,
    IProCustomPreset,
    IProObfuscationResult,
    TProApiProgressCallback
} from '../interfaces/pro-api/IProApiClient';
import { ApiError } from './ApiError';
import { ProApiObfuscationResult } from './ProApiObfuscationResult';
import { ProOptionsPreset } from './enums/ProOptionsPreset';
import { Options } from '../options/Options';

/**
 * Pro API Client
 * Handles communication with the obfuscator.io Pro API using streaming mode
 */
export class ProApiClient {
    /**
     * API host (can be overridden via OBFUSCATOR_API_HOST env var)
     */
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    private static readonly apiHost = process.env.OBFUSCATOR_API_HOST || 'https://obfuscator.io';

    private static readonly apiUrl = `${ProApiClient.apiHost}/api/v1/obfuscate`;

    private static readonly uploadTokenUrl = `${ProApiClient.apiHost}/api/v1/upload/token`;

    private static readonly presetsUrl = `${ProApiClient.apiHost}/api/v1/presets`;

    private static readonly builtInPresets: ReadonlySet<string> = new Set(Object.values(ProOptionsPreset));

    /**
     * Default timeout (5 minutes)
     */
    private static readonly defaultTimeout = 300000;

    /**
     * Threshold for using blob upload. Matches the server's inline cap,
     * just under Vercel's 4.5MB (decimal) body limit.
     */
    private static readonly blobUploadThreshold = 4_400_000;

    /**
     * Headroom for the blob URL and JSON envelope in the follow-up request
     */
    private static readonly followUpBodyHeadroom = 512;

    private readonly config: {
        apiToken: string;
        timeout: number;
        version?: string;
    };

    private readonly presetRequests: Map<string, Promise<IProCustomPreset | null>> = new Map();

    public constructor(config: IProApiConfig) {
        this.config = {
            apiToken: config.apiToken,
            timeout: config.timeout ?? ProApiClient.defaultTimeout,
            version: config.version
        };
    }

    /**
     * Check if any Pro features are enabled in the options.
     * Pro features require the Pro API for cloud-based obfuscation. A preset
     * name the local obfuscator cannot expand (a VM preset, or a custom
     * preset alias) counts too: only the Pro API can resolve it.
     */
    public static hasProFeatures(options: TInputOptions): boolean {
        return (
            options.vmObfuscation === true ||
            options.parseHtml === true ||
            (typeof options.optionsPreset === 'string' && !Options.isLocalPreset(options.optionsPreset))
        );
    }

    /**
     * Whether an `optionsPreset` value is one the obfuscator itself
     * understands. Anything else names a custom preset saved in the dashboard.
     */
    public static isBuiltInPreset(optionsPreset: string | undefined): boolean {
        return optionsPreset !== undefined && ProApiClient.builtInPresets.has(optionsPreset);
    }

    /**
     * Fetch a custom preset by its alias, or null when the caller has no
     * preset with that alias.
     * @param alias - The alias set in the dashboard's save dialog
     */
    public async fetchPreset(alias: string): Promise<IProCustomPreset | null> {
        let request = this.presetRequests.get(alias);

        if (!request) {
            request = this.requestPreset(alias);
            this.presetRequests.set(alias, request);
        }

        return request;
    }

    /**
     * Options with a custom `optionsPreset` expanded: the preset's saved
     * options become the base and the caller's other options override them,
     * the same base-then-overrides order the obfuscator applies to a built-in
     * preset. A built-in `optionsPreset` (or none) is returned untouched, with
     * no request made.
     * @param options - Obfuscation options, possibly naming a custom preset
     * @throws {ApiError} 404 when the alias names no preset of the caller's
     */
    public async resolveOptions(options: TInputOptions): Promise<TInputOptions> {
        const { optionsPreset, ...rest } = options;

        if (typeof optionsPreset !== 'string' || ProApiClient.isBuiltInPreset(optionsPreset)) {
            return options;
        }

        const preset = await this.fetchPreset(optionsPreset);

        if (!preset) {
            throw new ApiError(`Custom preset "${optionsPreset}" not found`, 404);
        }

        return { ...preset.options, ...rest };
    }

    /**
     * Obfuscate code using the Pro API (streaming mode)
     * @param sourceCode - Source code to obfuscate
     * @param options - Obfuscation options
     * @param onProgress - Optional progress callback
     * @returns Promise resolving to obfuscation result
     */
    public async obfuscate(
        sourceCode: string,
        options: TInputOptions = {},
        onProgress?: TProApiProgressCallback
    ): Promise<IProObfuscationResult> {
        if (!ProApiClient.hasProFeatures(options)) {
            throw new ApiError('Obfuscator.io Pro obfuscation works only when Pro features set.', 400);
        }

        const requestBody = JSON.stringify({
            code: sourceCode,
            options
        });

        const bodySize = Buffer.byteLength(requestBody, 'utf8');

        if (bodySize > ProApiClient.blobUploadThreshold) {
            return this.obfuscateWithBlobUpload(sourceCode, options, requestBody, onProgress);
        }

        return this.obfuscateDirect(requestBody, onProgress);
    }

    /**
     * Direct obfuscation for small files
     */
    private async obfuscateDirect(
        requestBody: string,
        onProgress?: TProApiProgressCallback
    ): Promise<IProObfuscationResult> {
        const headers: Record<string, string> = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Accept': 'application/x-ndjson',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Authorization': `Bearer ${this.config.apiToken}`
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        let url = ProApiClient.apiUrl;

        if (this.config.version) {
            url = `${ProApiClient.apiUrl}?version=${encodeURIComponent(this.config.version)}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: requestBody,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            return this.handleStreamingResponse(response, onProgress);
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Request timeout', 408);
            }

            throw error;
        }
    }

    /**
     * Obfuscation with blob upload for large files (Team/Business plans).
     * Uploads the raw source (`blobFormat: 'raw'`); falls back to the
     * legacy whole-JSON-body format when options are too large to travel
     * inline.
     */
    private async obfuscateWithBlobUpload(
        sourceCode: string,
        options: TInputOptions,
        legacyRequestBody: string,
        onProgress?: TProApiProgressCallback
    ): Promise<IProObfuscationResult> {
        onProgress?.('Uploading large file...');

        const followUpSize =
            Buffer.byteLength(JSON.stringify({ blobUrl: '', blobFormat: 'raw', options }), 'utf8') +
            ProApiClient.followUpBodyHeadroom;
        const useRawFormat = followUpSize <= ProApiClient.blobUploadThreshold;

        // `text/plain`: the API rejects executable script MIME types
        const blobUrl = useRawFormat
            ? await this.uploadToBlob('obfuscate-source.js', sourceCode, 'text/plain')
            : await this.uploadToBlob('obfuscate-request.json', legacyRequestBody, 'application/json');

        const followUpBody = useRawFormat
            ? JSON.stringify({ blobUrl, blobFormat: 'raw', options })
            : JSON.stringify({ blobUrl });

        onProgress?.('File uploaded, starting obfuscation...');

        const headers: Record<string, string> = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Accept': 'application/x-ndjson',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Authorization': `Bearer ${this.config.apiToken}`
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        let url = ProApiClient.apiUrl;

        if (this.config.version) {
            url = `${ProApiClient.apiUrl}?version=${encodeURIComponent(this.config.version)}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: followUpBody,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            return this.handleStreamingResponse(response, onProgress);
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Request timeout', 408);
            }

            throw error;
        }
    }

    /**
     * Upload content to blob storage using client-side upload
     */
    private async uploadToBlob(pathname: string, content: string, contentType: string): Promise<string> {
        // Step 1: Get client upload token from server (server adds random suffix)
        const clientToken = await this.getUploadToken(pathname);

        // Step 2: Upload directly to Vercel Blob using the client token
        return this.uploadWithClientToken(clientToken, pathname, content, contentType);
    }

    /**
     * Get a client upload token from the server
     */
    private async getUploadToken(pathname: string): Promise<string> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(ProApiClient.uploadTokenUrl, {
                method: 'POST',
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/json',
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Authorization': `Bearer ${this.config.apiToken}`
                },
                body: JSON.stringify({ pathname }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const responseText = await response.text();

            let data: { clientToken?: string; error?: string };

            try {
                data = JSON.parse(responseText);
            } catch {
                throw new ApiError(responseText || 'Failed to get upload token', response.status);
            }

            if (!response.ok) {
                throw new ApiError(data.error ?? 'Failed to get upload token', response.status);
            }

            if (!data.clientToken) {
                throw new ApiError('No client token returned', 500);
            }

            return data.clientToken;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Token request timeout', 408);
            }

            throw error;
        }
    }

    /**
     * GET /api/v1/presets/{alias}. Same shape as getUploadToken: JSON body,
     * `{ error }` on failure, the request timeout mapped to 408.
     */
    private async requestPreset(alias: string): Promise<IProCustomPreset | null> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        try {
            const response = await fetch(`${ProApiClient.presetsUrl}/${encodeURIComponent(alias)}`, {
                method: 'GET',
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Authorization': `Bearer ${this.config.apiToken}`
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.status === 404) {
                return null;
            }

            const responseText = await response.text();

            let data: (IProCustomPreset & { error?: string }) | { error?: string };

            try {
                data = JSON.parse(responseText);
            } catch {
                throw new ApiError(responseText || 'Failed to fetch preset', response.status);
            }

            if (!response.ok) {
                throw new ApiError(data.error ?? 'Failed to fetch preset', response.status);
            }

            return <IProCustomPreset>data;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Preset request timeout', 408);
            }

            throw error;
        }
    }

    /**
     * Upload file directly to Vercel Blob using client token
     */
    private async uploadWithClientToken(
        clientToken: string,
        pathname: string,
        content: string,
        contentType: string
    ): Promise<string> {
        const blobClient = await import('@vercel/blob/client');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes for upload

        try {
            const blob = await blobClient.put(pathname, content, {
                access: 'public',
                token: clientToken,
                contentType
            });

            clearTimeout(timeoutId);

            return blob.url;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof Error && error.name === 'AbortError') {
                throw new ApiError('Upload timeout', 408);
            }

            if (error instanceof Error) {
                throw new ApiError(`Upload failed: ${error.message}`, 500);
            }

            throw error;
        }
    }

    /**
     * Handle streaming (NDJSON) response from API
     * Supports both direct result and chunked response formats
     */
    // eslint-disable-next-line complexity
    private async handleStreamingResponse(
        response: Response,
        onProgress?: TProApiProgressCallback
    ): Promise<IProObfuscationResult> {
        const text = await response.text();
        const lines = text.trim().split('\n');

        const messages: IProApiStreamMessage[] = [];

        for (const line of lines) {
            if (!line.trim()) {
                continue;
            }

            try {
                const message: IProApiStreamMessage = JSON.parse(line);
                messages.push(message);

                if (message.type === 'progress' && message.message && onProgress) {
                    onProgress(message.message);
                }
            } catch {
                // Skip invalid JSON lines
            }
        }

        const errorMessage = messages.find((message) => message.type === 'error');

        if (errorMessage) {
            throw new ApiError(errorMessage.message ?? 'Unknown API error', response.status);
        }

        const result = this.reassembleChunkedResponse(messages);

        if (!result.code) {
            throw new ApiError('No result received from API', 500);
        }

        return new ProApiObfuscationResult(result.code, result.sourceMap || '');
    }

    /**
     * Reassemble chunked streaming response
     * Handles both chunked format (chunk/chunk_end) and direct result format
     */
    // eslint-disable-next-line complexity
    private reassembleChunkedResponse(messages: IProApiStreamMessage[]): { code: string; sourceMap: string } {
        const codeChunks: string[] = [];
        const sourceMapChunks: string[] = [];
        let result = { code: '', sourceMap: '' };

        for (const message of messages) {
            switch (message.type) {
                case 'chunk':
                    if (message.field === 'code' && message.data !== undefined && message.index !== undefined) {
                        codeChunks[message.index] = message.data;
                    } else if (
                        message.field === 'sourceMap' &&
                        message.data !== undefined &&
                        message.index !== undefined
                    ) {
                        sourceMapChunks[message.index] = message.data;
                    }

                    break;

                case 'chunk_end':
                    result.code = codeChunks.join('');
                    result.sourceMap = (sourceMapChunks.join('') || message.sourceMap) ?? '';

                    break;

                case 'result':
                    result = {
                        code: message.code ?? '',
                        sourceMap: message.sourceMap ?? ''
                    };

                    break;
            }
        }

        return result;
    }
}
