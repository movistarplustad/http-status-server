// @ts-check
import { Router } from 'express'
import { getClientIp } from 'request-ip'

export function statusRouter() {
  const router = Router()

  router.get('/', (req, res) => {
    res.json({
      ip: getClientIp(req),
      status: 200
    })
  })

  router.get('/:status', (req, res) => {
    const { timeout = "0" } = req.query
    const { status } = req.params
    res.statusCode = Number(status)
    if (Number(timeout) > 0) {
      setTimeout(() => {
        res.json({
          timeout: true,
          status
        })
      }, Number(timeout))
      return
    } else {
      res.json({
        status
      })
    }
  })

  return router
}
