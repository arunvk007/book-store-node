// Augment the global Error interface to include the code property
declare global {
    interface Error {
        code?: number;
    }
}

// Define HttpError class extending the global Error class
export default class HttpError extends Error {
    code?: number;

    constructor(message: string, errorCode: number) {
        super(message);
        this.code = errorCode;
    }
}
