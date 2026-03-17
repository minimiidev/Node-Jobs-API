import { CustomAPIError } from "./custom-api";
export declare class NotFoundError extends CustomAPIError {
    private readonly statusCode;
    constructor(statusCode: number, message: string);
}
//# sourceMappingURL=not-found.d.ts.map