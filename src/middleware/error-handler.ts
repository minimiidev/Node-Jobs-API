import { StatusCodes } from "http-status-codes"
import { CustomAPIError } from "../errors"
import { NextFunction, Request, Response } from "express"

interface ValidationError {
  message: string
}

interface Error {
  name?: string
  value?: any
  errors?: Record<string, ValidationError>
  code?: number
  keyValue?: any
  statusCode: number
  message?: string
}

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  }

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = Object.values(err.errors ?? {}).map((item) => item.message).join(",")
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
  }

  if (err.name === "CastError") {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `No item found with id ${err.value}`
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })

}