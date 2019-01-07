'use strict'

import koaRouter from 'koa-router'
import CityControllers from '../controllers/city'

const router = new koaRouter({
  prefix:'/city'
})
const city = new CityControllers()

router.post('/add', city.add)
router.post('/delete', city.delete)
router.post('/update/:id', city.update)
router.get('/list', city.list)
router.get('/detail/:id', city.detail)
router.get('/all', city.all)

export default router