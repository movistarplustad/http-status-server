// @ts-check

import { StatusCodes } from 'http-status-codes'

/**
 * 
 * @returns {import('express').ErrorRequestHandler}
 */
export function errorMiddleware() {
  return (err, _, res, __) => {
    if(res.statusCode < StatusCodes.MULTIPLE_CHOICES) {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }
    res.json({
      message: err.message,
      statusCode: res.statusCode
    })
  }
}