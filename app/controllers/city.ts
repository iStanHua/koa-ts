'use strict'

import { Context } from 'koa'

import Controller from './index'
import { responseFormat } from '../models/responseFormat'

import CityServices from '../services/city'

const City = new CityServices()

export default class CityController extends Controller {
  constructor() {
    super()
  }

  /**
   * 新增城市
   * @param {Number} ID   ID
   * @param {String} Name   Name
   * @param {String} CountryCode   CountryCode
   * @param {String} District   District
   * @param {Number} Population   Population
   */
  async add(ctx: Context, next: any) {
    let _body: responseFormat = { code: 200, data: '新增成功' }
    if (await this.checkAuth(ctx)) {
      let result = await City.addCity(ctx.request.body)
      if (result && result.code) {
        _body = result
      }
      else {
        _body.data = result
      }
    }
    else {
      _body = this.errorInfo.unauthorized()
    }
    this.success(ctx, _body)
  }

  /**
   * 修改城市
   * @param {Number} ID   ID
   * @param {String} Name   Name
   * @param {String} CountryCode   CountryCode
   * @param {String} District   District
   * @param {Number} Population   Population
   */
  async update(ctx: Context, next: any) {
    let _body: responseFormat = { code: 200, data: '修改成功' }
    if (await this.checkAuth(ctx)) {
      let { id } = ctx.params
      // if (id && isNaN(Number(id))) {
      //  return this.success(ctx, this.errorInfo.invalid('编号'))
      // }
      let result = await City.updateCity(id, ctx.request.body)
      if (result && result.code) {
        _body = result
      }
    }
    else {
      _body = this.errorInfo.unauthorized()
    }
    this.success(ctx, _body)
  }

  /**
   * 删除城市
   */
  async delete(ctx: Context, next: any) {
    let _body: responseFormat = { code: 200, data: '删除成功' }
    if (await this.checkAuth(ctx)) {
      let { id } = ctx.params
      // if (id && isNaN(Number(id))) {
      //  return this.success(ctx, this.errorInfo.invalid('编号'))
      // }
      let { flag } = ctx.request.body
      let result = await City.deleteCity(id)
      if (result && result.code) {
        _body = result
      }
    }
    else {
      _body = this.errorInfo.unauthorized()
    }
    this.success(ctx, _body)
  }

  /**
   * 城市详情
   */
  async detail(ctx: Context, next: any) {
    let _body: responseFormat = { code: 200, data: '查询成功' }
    let { id } = ctx.params
    if (id && isNaN(Number(id))) {
      return this.success(ctx, this.errorInfo.invalid('编号'))
    }
    let result = await City.cityDetail(parseInt(id))
    if (result && result.code) {
      _body = result
    }
    else {
      _body.data = result
    }
    this.success(ctx, _body)
  }

  /**
   * 城市列表
   * @param {Number} page_index  页码索引
   * @param {Number} page_size   每页显示记录数
   */
  async list(ctx: Context, next: any) {
    let _body: responseFormat = { code: 200, data: '查询成功' }
    let result = await City.cityList(ctx.query)
    if (result && result.code) {
      _body = result
    }
    else {
      _body.data = result
    }
    this.success(ctx, _body)
  }
  /**
   * 全部城市列表
   */
  async all(ctx: Context, next: any) {
    let _body: responseFormat = { code: 200, data: '查询成功' }
    let result = await City.cityAll()
    if (result && result.code) {
      _body = result
    }
    else {
      _body.data = result
    }
    this.success(ctx, _body)
  }
}