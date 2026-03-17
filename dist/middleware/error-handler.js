"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
    };
    if (err instanceof errors_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    if (err.name === "ValidationError") {
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(err.errors ?? {}).map((item) => item.message).join(",");
    }
    if (err.code && err.code === 11000) {
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    }
    if (err.name === "CastError") {
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        customError.msg = `No item found with id ${err.value}`;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.js.map