'use strict'

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import convert from 'koa-convert'
import cors from 'koa-cors'
import helmet from 'koa-helmet'
import favicon from 'koa-favicon'
import Static from 'koa-static'
import json from 'koa-json'
import log4js from 'log4js'

import configs from './config'
import errorInfo from './app/extends/errorInfo'
import response from './app/middlewares/response'
import routes from './app/routes'

const app = new Koa()

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(helmet())
app.use(json())
app.use(convert(cors()))
app.use(convert(favicon(__dirname + '/public/logo.jpg')))
app.use(convert(Static(__dirname + '/public')))

// router
.use(routes.routes())
.use(routes.allowedMethods())

app.use(response)


// logger
app.use(async (ctx, next) => {
  const start: number = Date.now()
  await next()
  const ms: number = Date.now() - start
  console.error(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.context.onerror = function (e) {
  this.app.emit('error', e, this)
  this.body = errorInfo.serverError()
  this.res.end(this.body)
}

log4js.configure({
  appenders: {
    file: {
      type: 'dateFile',
      filename: __dirname + '/logs/error',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: !0,
      category: 'logger'
    }
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'debug'
    }
  }
})

const log = log4js.getLogger('logger')

// error-handling
app.on('error', (err, ctx) => {
  if (err)
    log.error(err)
})

app.listen(configs.server.port, () => {
  console.log(`Listening on http://${configs.server.host}:${configs.server.port}`)
})
