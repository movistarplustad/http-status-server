// @ts-check
import { Router } from 'express'
import cors from 'cors'

export function corsRouter() {
  const router = Router()
  const corsOptions = {
    origin: "http://example.com/*"
  }

  router.options("/", cors(corsOptions))
  router.use(
    "/",
    cors(corsOptions),
    (_, res) => {
      res.json({
        message: "CORS Disabled"
      })
    })

  return router
}

