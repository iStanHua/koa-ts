'use strict'
import { Context } from 'koa'
import util from 'util'

import errorInfo from '../extends/errorInfo'
import { outputFormat } from '../models/outputFormat'

export default class Controller {

  errorInfo = errorInfo
  constructor() { }

  /**
   * 权限值
   * @param {Context} ctx 上下文
   */
  getAuth(ctx: Context) {
    return ctx.get('Authorization')
  }

  /**
   * 验证权限
   * @param {Context} ctx 上下文
   */
  async checkAuth(ctx: Context) {
    return await ctx.redis.get(this.getAuth(ctx))
  }

  /**
   * 输出格式化
   * @param {Context} ctx 上下文
   * @param {} options
   */
  success(ctx: Context, options: any) {
    ctx.body = {
      code: options.code,
      data: options.data
    }
  }

  /**
   * 通用
   */
  common(ctx: Context, data: outputFormat) {
    let _body = { code: 1002, data: data }
    return this.success(ctx, _body)
  }

  /**
   * 长度区间
   */
  /**
   *
   * @param ctx
   * @param name
   * @param min
   * @param max
   */
  rangeLength(ctx: Context, name, min, max) {
    let _body = { code: 1002, data: '%s长度必须在%s-%s位之间' }
    _body.data = util.format(_body.data, name, min, max)
    return this.success(ctx, _body)
  }

  /**
   * 长度最小
   */
  minLength(ctx: Context, name, min) {
    let _body = { code: 1002, data: '%s长度最小为%s' }
    _body.data = util.format(_body.data, name, min)
    return this.success(ctx, _body)
  }

  /**
   * 长度最大
   */
  maxLength(ctx: Context, name, max) {
    let _body = { code: 1002, data: '%s长度最多为%s' }
    _body.data = util.format(_body.data, name, max)
    return this.success(ctx, _body)
  }

  /**
   * 值区间
   */
  range(ctx: Context, name, min, max) {
    let _body = { code: 1002, data: '%s值必须在%s-%s之间' }
    _body.data = util.format(_body.data, name, min, max)
    return this.success(ctx, _body)
  }

  /**
   * 最小
   */
  min(ctx: Context, name, min) {
    let _body = { code: 1002, data: '%s值不能小于%s' }
    _body.data = util.format(_body.data, name, min)
    return this.success(ctx, _body)
  }

  /**
   * 最大
   */
  max(ctx: Context, name, max) {
    let _body = { code: 1002, data: '%s值不能大于%s' }
    _body.data = util.format(_body.data, name, max)
    return this.success(ctx, _body)
  }

  /**
   * 纯数字
   */
  pureNumber(ctx: Context, name) {
    let _body = { code: 1002, data: '%s不能为纯数字' }
    _body.data = util.format(_body.data, name)
    return this.success(ctx, _body)
  }
}