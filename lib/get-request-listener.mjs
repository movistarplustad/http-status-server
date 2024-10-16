// @ts-check

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { notFoundMiddleware } from './middlewares/not-found.middleware.mjs'
import { errorMiddleware } from './middlewares/error.middleware.mjs'
import { statusRouter } from './routers/status.router.mjs'
import { homeRouter } from './routers/home.router.mjs'
import { corsRouter } from './routers/cors.router.mjs'

/**
 * @returns {import("express").Application}
 */
export function getRequestListener(ip, port) {
  const app =  express()
  app.set('view engine', 'ejs')
  app.use(morgan('common'))

  app.use(express.static('public'))
  app.use('/cors', corsRouter())
  app.use('/status', cors(), statusRouter())
  app.use('/', cors(), homeRouter(ip, port) )

  app.use(notFoundMiddleware())
  app.use(errorMiddleware())

  return app
}