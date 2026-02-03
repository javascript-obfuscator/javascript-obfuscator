import { TInputOptions } from '../types/options/TInputOptions';
import {
    IProApiConfig,
    IProApiStreamMessage,
    IProObfuscationResult,
    TProApiProgressCallback
} from '../interfaces/pro-api/IProApiClient';
import { ApiError } from './ApiError';
import { ProApiObfuscationResult } from './ProApiObfuscationResult';

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

    /**
     * Default timeout (5 minutes)
     */
    private static readonly defaultTimeout = 300000;

    /**
     * Threshold for using blob upload (4.4MB)
     * Vercel has a ~4.5MB body limit
     */
    private static readonly blobUploadThreshold = 4.4 * 1024 * 1024;

    private readonly config: {
        apiToken: string;
        timeout: number;
        version?: string;
    };

    public constructor(config: IProApiConfig) {
        this.config = {
            apiToken: config.apiToken,
            timeout: config.timeout ?? ProApiClient.defaultTimeout,
            version: config.version
        };
    }

    /**
     * Check if any Pro features are enabled in the options.
     * Pro features require the Pro API for cloud-based obfuscation.
     */
    public static hasProFeatures(options: TInputOptions): boolean {
        return options.vmObfuscation === true || options.parseHtml === true;
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
            return this.obfuscateWithBlobUpload(requestBody, onProgress);
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
     * Obfuscation with blob upload for large files
     */
    private async obfuscateWithBlobUpload(
        requestBody: string,
        onProgress?: TProApiProgressCallback
    ): Promise<IProObfuscationResult> {
        onProgress?.('Uploading large file...');

        const blobUrl = await this.uploadToBlob(requestBody);

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
                body: JSON.stringify({ blobUrl }),
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
     * Upload request body to blob storage using client-side upload
     */
    private async uploadToBlob(requestBody: string): Promise<string> {
        const pathname = 'obfuscate-request.json';

        // Step 1: Get client upload token from server (server adds random suffix)
        const clientToken = await this.getUploadToken(pathname);

        // Step 2: Upload directly to Vercel Blob using the client token
        return this.uploadWithClientToken(clientToken, pathname, requestBody);
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
     * Upload file directly to Vercel Blob using client token
     */
    private async uploadWithClientToken(clientToken: string, pathname: string, requestBody: string): Promise<string> {
        const blobClient = await import('@vercel/blob/client');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes for upload

        try {
            const blob = await blobClient.put(pathname, requestBody, {
                access: 'public',
                token: clientToken
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
