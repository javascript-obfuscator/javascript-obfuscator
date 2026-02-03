import { TIdentifierNamesCache } from '../../types/TIdentifierNamesCache';

/**
 * Simplified obfuscation result for Pro API responses
 * Does not extend IInitializable since results come from the API
 */
export interface IProObfuscationResult {
    /**
     * @returns {TIdentifierNamesCache}
     */
    getIdentifierNamesCache(): TIdentifierNamesCache;

    /**
     * @return {string}
     */
    getObfuscatedCode(): string;

    /**
     * @return {string}
     */
    getSourceMap(): string;

    /**
     * @return {string}
     */
    toString(): string;
}

/**
 * Configuration for the Pro API client
 */
export interface IProApiConfig {
    /**
     * API token from obfuscator.io
     * Get your token at https://obfuscator.io/dashboard
     */
    apiToken: string;

    /**
     * Request timeout in milliseconds (default: 300000 - 5 minutes)
     */
    timeout?: number;

    /**
     * Obfuscator version to use (e.g., '5.0.0-beta.20')
     * Defaults to latest version if not specified
     */
    version?: string;
}

/**
 * Progress callback for streaming responses
 */
export type TProApiProgressCallback = (message: string) => void;

/**
 * Streaming message types from the API
 * The API always uses streaming mode (NDJSON format)
 */
export interface IProApiStreamMessage {
    /**
     * Message type:
     * - 'progress': Progress update message
     * - 'result': Direct result (non-chunked, for small outputs)
     * - 'chunk': Chunked data piece (for large outputs)
     * - 'chunk_end': End of chunked data
     * - 'error': Error message
     */
    type: 'progress' | 'result' | 'chunk' | 'chunk_end' | 'error';

    /** Progress or error message text */
    message?: string;

    /** Obfuscated code (for 'result' type) */
    code?: string;

    /** Source map (for 'result' or 'chunk_end' type) */
    sourceMap?: string;

    /** Field name for chunk: 'code' or 'sourceMap' (for 'chunk' type) */
    field?: 'code' | 'sourceMap';

    /** Chunk data (for 'chunk' type) */
    data?: string;

    /** Chunk index (for 'chunk' type) */
    index?: number;

    /** Total number of chunks (for 'chunk' type) */
    total?: number;
}

/**
 * Response from the Blob upload endpoint
 */
export interface IProApiBlobUploadResponse {
    blobUrl?: string;
    error?: string;
}
