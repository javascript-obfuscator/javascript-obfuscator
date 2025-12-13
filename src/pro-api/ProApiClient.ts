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
 * API URL (hardcoded)
 */
const API_URL = 'https://obfuscator.io/api/v1/obfuscate';

/**
 * Default timeout (5 minutes)
 */
const DEFAULT_TIMEOUT = 300000;

/**
 * Pro API Client
 * Handles communication with the obfuscator.io Pro API using streaming mode
 */
export class ProApiClient {
    private readonly config: {
        apiToken: string;
        timeout: number;
        version?: string;
    };

    public constructor(config: IProApiConfig) {
        this.config = {
            apiToken: config.apiToken,
            timeout: config.timeout ?? DEFAULT_TIMEOUT,
            version: config.version
        };
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
        // Validate vmObfuscation is enabled
        if (!options.vmObfuscation) {
            throw new ApiError(
                'obfuscatePro method works only with VM obfuscation. Set vmObfuscation: true in options.',
                400
            );
        }

        // Always use streaming mode
        const headers: Record<string, string> = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Accept': 'application/x-ndjson',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Authorization': `Bearer ${this.config.apiToken}`
        };

        const body = JSON.stringify({
            code: sourceCode,
            options
        });

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        // Build URL with optional version parameter
        let url = API_URL;

        if (this.config.version) {
            url = `${API_URL}?version=${encodeURIComponent(this.config.version)}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body,
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

                // Call progress callback for progress messages
                if (message.type === 'progress' && message.message && onProgress) {
                    onProgress(message.message);
                }
            } catch {
                // Skip invalid JSON lines
            }
        }

        // Check for error messages
        const errorMessage = messages.find((m) => m.type === 'error');
        if (errorMessage) {
            throw new ApiError(errorMessage.message ?? 'Unknown API error', response.status);
        }

        // Reassemble the result (handles both chunked and non-chunked responses)
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

        for (const msg of messages) {
            switch (msg.type) {
                case 'chunk':
                    if (msg.field === 'code' && msg.data !== undefined && msg.index !== undefined) {
                        codeChunks[msg.index] = msg.data;
                    } else if (msg.field === 'sourceMap' && msg.data !== undefined && msg.index !== undefined) {
                        sourceMapChunks[msg.index] = msg.data;
                    }
                    break;

                case 'chunk_end':
                    result.code = codeChunks.join('');
                    result.sourceMap = (sourceMapChunks.join('') || msg.sourceMap) ?? '';
                    break;

                case 'result':
                    // Direct result (non-chunked)
                    result = {
                        code: msg.code ?? '',
                        sourceMap: msg.sourceMap ?? ''
                    };
                    break;
            }
        }

        return result;
    }
}
