import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api";


export class UnauthenticatedError extends CustomAPIError {
    private readonly statusCode

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
