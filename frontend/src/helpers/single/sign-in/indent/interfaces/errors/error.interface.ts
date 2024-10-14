export interface IAPIError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };
}  