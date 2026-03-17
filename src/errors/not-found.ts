import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api";


export class NotFoundError extends CustomAPIError {
  private readonly statusCode;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

