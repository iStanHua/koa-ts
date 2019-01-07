'use strict'

import Router from 'koa-router'
import City from './city'
const router = new Router({
  prefix: '/api'
})

router.use(City.routes(), City.allowedMethods())

export default router