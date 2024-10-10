import { StatusCodes } from "http-status-codes"

export function notFoundMiddleware() {
  return (_, res, next) => {
    res.statusCode = StatusCodes.NOT_FOUND
    next(new Error('Not Found'))
  }
}