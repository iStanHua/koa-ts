'use strict'

import util from 'util'

export default class errorInfo {
  private static UNKNOWN: any = { code: -1, data: '未知错误' }
  private static ABNORMAL: any = { code: 0, data: '处理异常' }
  private static NOTFOUND: any = { code: 400, data: '未找到' }
  private static UNAUTHORIZED: any = { code: 401, data: '权限认证失败' }
  private static SERVEREORROR: any = { code: 500, data: '内部服务器错误' }
  private static NODATA: any = { code: 1000, data: '没有相关数据' }
  private static REQUIRED: any = { code: 1001, data: '%s不能为空' }
  private static FOUND: any = { code: 1002, data: '%s已存在' }
  private static INVALID: any = { code: 1003, data: '%s字段无效' }
  private static MISMATCH: any = { code: 1004, data: '%s和%s不匹配' }
  private static UNEXIST: any = { code: 1005, data: '%s不存在' }
  private static WRONGFORMAT: any = { code: 1006, data: '%s格式有误' }

  constructor() {
  }

  /**
   * 未知错误
   */
  public static unknown() {
    return Object.assign({}, this.UNKNOWN)
  }

  /**
   * 处理异常
   */
  public static abnormal() {
    return Object.assign({}, this.ABNORMAL)
  }

  /**
   * 未找到
   */
  public static notfound() {
    return Object.assign({}, this.NOTFOUND)
  }

  /**
   * 权限认证失败
   */
  public static unauthorized() {
    return Object.assign({}, this.UNAUTHORIZED)
  }

  /**
   * 内部服务器错误
   */
  public static serverError() {
    return Object.assign({}, this.SERVEREORROR)
  }

  /**
   * 没有相关数据
   */
  public static nodata() {
    return Object.assign({}, this.NODATA)
  }

  /**
   * 必填
   * @param {String} value
   */
  public static required(value: string) {
    let _body = Object.assign({}, this.REQUIRED)
    _body.data = util.format(_body.data, value)
    return _body
  }

  /**
   * 已存在
   * @param {String} value
   */
  public static found(value: string) {
    let _body = Object.assign({}, this.FOUND)
    _body.data = util.format(_body.data, value)
    return _body
  }

  /**
   * 字段无效
   * @param {String} value
   */
  public static invalid(value: string) {
    let _body = Object.assign({}, this.INVALID)
    _body.data = util.format(_body.data, value)
    return _body
  }

  /**
   * 不匹配
   * @param {String} value
   */
  public static unmatch(value1: string, value2: string) {
    let _body = Object.assign({}, this.MISMATCH)
    _body.data = util.format(_body.data, value1, value2)
    return _body
  }

  /**
   * 不存在
   * @param {String} value
   */
  public static unexist(value: string) {
    let _body = Object.assign({}, this.UNEXIST)
    _body.data = util.format(_body.data, value)
    return _body
  }

  /**
   * 格式有误
   * @param {String} value
   */
  public static wrongFormat(value: string) {
    let _body = Object.assign({}, this.WRONGFORMAT)
    _body.data = util.format(_body.data, value)
    return _body
  }
}