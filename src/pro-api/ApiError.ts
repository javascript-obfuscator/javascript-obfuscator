/**
 * Error thrown by Pro API
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly response?: string;

    public constructor(message: string, statusCode: number, response?: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.response = response;
    }
}
