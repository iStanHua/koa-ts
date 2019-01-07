'use strict'

import Knex from 'knex'
import config from '../../config'
import errorInfo from '../extends/errorInfo'

export default class Service {
  table: string = ''
  knex: any = null
  errorInfo = errorInfo

  constructor(table: string) {
    this.table = table
    this.knex = Knex(config.db)
  }

  /**
   * 执行sql语句
   * @param {String} sql     sql语句
   * @param {Array} values   值
   * @returns knex对象
   */
  async query(sql: string, values: any = []) {
    return await this.knex.raw(sql, values)
  }

  /**
   * 新增
   * @param {Object} values  值
   * @returns knex对象
   */
  async insert(values: any = {}) {
    let dt = new Date().getTime()
    if (!values.created_time) {
      values.created_time = dt
    }
    if (!values.updated_time) {
      values.updated_time = dt
    }
    return await this.knex(this.table).returning(['id']).insert(values)
  }

  /**
   * 批量新增
   * @param {Array}  records  从中创建实例的对象列表（键/值对）
   * @returns knex对象
   */
  async batchInsert(records: any = []) {
    return await this.knex(this.table).insert(records)
  }

  /**
   * 新增或修改
   * @param {Object} values  值
   * @param {Object} where   where值
   */
  async insertOrUpdate(values: any = {}, where: any = {}) {
    let result = await this.count({ where: where })
    if (result) {
      return await this.update(values, where)
    }
    else {
      let dt = new Date().getTime()
      if (!values.created_time) {
        values.created_time = dt
      }
      if (!values.updated_time) {
        values.updated_time = dt
      }
      return await this.insert(values)
    }
  }

  /**
   * 修改
   * @param {Object} values  值
   * @param {Object} where   where值
   * @returns  记录
   */
  async update(values: any = {}, where: any = {}) {
    if (!values.updated_time) {
      values.updated_time = new Date().getTime()
    }
    return await this.knex(this.table).update(values, { where: where })
  }

  /**
   * 删除
   * @param {Object} where  where值
   * @returns  记录
   */
  async delete(where: any = {}) {
    return await this.knex(this.table).del({ where: where })
  }

  /**
   * 获取或新增
   * @param {Object} where     查询条件
   * @param {Object} defaults  默认值
   * @param {Array}  columns   显示字段
   * @returns  记录
   */
  async getOrInsert(where: any = {}, defaults: any = {}, columns: Array<string>) {
    let result = await this.get({ where: where }, columns)
    if (!result) {
      let dt = new Date().getTime()
      if (!defaults.created_time) {
        defaults.created_time = dt
      }
      if (!defaults.updated_time) {
        defaults.updated_time = dt
      }
      result = await this.insert(defaults)
    }
    return result
  }

  /**
   * 查询一条记录
   * @param {Object} where    参数(where)
   * @param {Array}  columns  显示字段
   * @returns 一条记录
   */
  async get(where: any = {}, columns?: Array<string>) {
    return await this.knex(this.table).where(where).first(columns)
  }

  /**
   * 查询记录
   * @param {Object} options        参数(where)
   * @param {Object} options.where  查询条件
   * @param {Array}  options.order  排序
   * @param {Array}  columns        显示字段
   * @returns 记录列表
   */
  async select(options: any = {}, columns?: Array<string>) {
    console.log(options)
    if (options.page_index && isNaN(Number(options.page_index))) {
      return this.errorInfo.invalid('页码')
    }
    if (options.page_size && isNaN(Number(options.page_size))) {
      return this.errorInfo.invalid('每页显示记录数')
    }
    options.page_index = Number(options.page_index) || 1
    options.page_size = Number(options.page_size) || 10

    let kx = this.knex(this.table).where(options.where)

    columns && (kx = kx.column(columns))
    kx = this._orderBy(kx, options.order)
    kx = kx.limit(options.page_size).offset((options.page_index - 1) * options.page_size)
    return await kx
  }

  /**
   * 查询全部记录
   * @param {Object} options        参数(where,order)
   * @param {Object} options.where  查询条件
   * @param {Array}  options.order  排序
   * @param {Array}  columns        显示字段
   * @returns 全部记录
   */
  async findAll(options: any = {}, columns?: Array<string>) {
    let kx = this.knex(this.table).where(options.where)

    columns && (kx = kx.column(columns))

    kx = this._orderBy(kx, options.order)
    return await kx
  }

  /**
   * 记录数
   * @param {String}        table   模块名
   * @param {Object}        where   where值
   * @param {String|Object} field   字段
   * @returns
   */
  async count(where: any = {}, field?: any) {
    return await this.knex(this.table).where(where).count(field)
  }

  /**
   * 总和
   * @param {String} field   字段(column|columns|raw)
   * @returns 总和
   */
  async sum(field: any) {
    return await this.knex(this.table).sum(field)
  }

  /**
   * 最大值
   * @param {String|Object} field  字段(column|columns|raw)
   * @returns 最大值
   */
  async max(field: any) {
    return await this.knex(this.table).max(field)
  }

  /**
   * 最小值
   * @param {String|Object} field  字段(column|columns|raw)
   * @returns 最小值
   */
  async min(field: any) {
    return await this.knex(this.table).min(field)
  }

  /**
   * 平均值
   * @param {String|Object} field  字段(column|columns|raw)
   * @returns 平均值
   */
  async avg(field: any) {
    return await this.knex(this.table).avg(field)
  }

  /**
   *
   * @param {Object} kx   knex对象
   * @param {Array} order [['sort', 'ASC']]
   * @returns knex对象
   */
  _orderBy(kx: any, order: Array<Array<string>>) {
    if (Array.isArray(order)) {
      order.forEach(o => {
        kx.orderBy(o[0], o[1].toString().toLowerCase())
      })
    }
    return kx
  }
}