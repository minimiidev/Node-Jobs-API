import { NextFunction, Request, Response } from "express";
interface ValidationError {
    message: string;
}
interface Error {
    name?: string;
    value?: any;
    errors?: Record<string, ValidationError>;
    code?: number;
    keyValue?: any;
    statusCode: number;
    message?: string;
}
export declare const errorHandlerMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=error-handler.d.ts.map