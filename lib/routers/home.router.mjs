// @ts-check
import { Router } from 'express'

export function homeRouter(ip ="localhost", port="3333") {
  const router = Router() 

  router.get('/', (req, res) => {
    res.render('home', {
      ip,
      port
    })
  })

  return router
}