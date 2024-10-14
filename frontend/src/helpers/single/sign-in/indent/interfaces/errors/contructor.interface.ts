export class APIError extends Error {
    response?: {
        data?: {
            message?: string;
        };
    };

    constructor(message: string, response?: any) {
        super(message);
        this.response = response;
    }
}
