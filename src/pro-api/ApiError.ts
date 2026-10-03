/**
 * Error thrown by Pro API
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly response?: string;

    public readonly code?: string;

    public constructor(message: string, statusCode: number, response?: string, code?: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.response = response;
        this.code = code;
    }
}
