'use strict'
import { Context } from 'koa'
import util from 'util'

import errorInfo from '../extends/errorInfo'
import { responseFormat } from '../models/responseFormat'

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
   * @param {Object} options
   */
  success(ctx: Context, options: any) {
    ctx.body = {
      code: options.code,
      data: options.data
    }
  }

  /**
   * 通用
   * @param {Context} ctx 上下文
   * @param {Object} data
   */
  common(ctx: Context, data: responseFormat) {
    let _body = { code: 1002, data: data }
    return this.success(ctx, _body)
  }

  /**
   *长度区间
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   * @param {Number} min   最小值
   * @param {Number} max   最大值
   */
  rangeLength(ctx: Context, value: string, min: number, max: number) {
    let _body = { code: 1002, data: '%s长度必须在%s-%s位之间' }
    _body.data = util.format(_body.data, value, min, max)
    return this.success(ctx, _body)
  }

  /**
   * 长度最小
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   * @param {Number} min   最小值
   */
  minLength(ctx: Context, value: string, min: number) {
    let _body = { code: 1002, data: '%s长度最小为%s' }
    _body.data = util.format(_body.data, value, min)
    return this.success(ctx, _body)
  }

  /**
   * 长度最大
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   * @param {Number} max   最大值
   */
  maxLength(ctx: Context, value: string, max: number) {
    let _body = { code: 1002, data: '%s长度最多为%s' }
    _body.data = util.format(_body.data, value, max)
    return this.success(ctx, _body)
  }

  /**
   * 值区间
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   * @param {Number} min   最小值
   * @param {Number} max   最大值
   */
  range(ctx: Context, value: string, min: number, max: number) {
    let _body = { code: 1002, data: '%s值必须在%s-%s之间' }
    _body.data = util.format(_body.data, value, min, max)
    return this.success(ctx, _body)
  }

  /**
   * 最小
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   * @param {Number} min   最小值
   */
  min(ctx: Context, value: string, min: number) {
    let _body = { code: 1002, data: '%s值不能小于%s' }
    _body.data = util.format(_body.data, value, min)
    return this.success(ctx, _body)
  }

  /**
   * 最大
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   * @param {Number} max   最大值
   */
  max(ctx: Context, value: string, max: number) {
    let _body = { code: 1002, data: '%s值不能大于%s' }
    _body.data = util.format(_body.data, value, max)
    return this.success(ctx, _body)
  }

  /**
   * 纯数字
   * @param {Context} ctx  上下文
   * @param {String} value 名称
   */
  pureNumber(ctx: Context, value: string) {
    let _body = { code: 1002, data: '%s不能为纯数字' }
    _body.data = util.format(_body.data, value)
    return this.success(ctx, _body)
  }
}