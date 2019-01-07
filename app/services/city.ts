'use strict'

import Service from './index'

import { CityModel } from '../models/city'

export default class CityService extends Service {
  constructor() {
    super('city')
  }

  /**
   * 新增城市
   */
  async addCity(data: CityModel) {
    return await this.insert(data)
  }

  /**
   * 修改城市
   */
  async updateCity(id: number, data: CityModel) {
    let res = await this.count({ id: id })
    if (!res) {
      return this.errorInfo.unexist('该城市')
    }
    return await this.update(data, { id: id })
  }

  /**
   * 删除城市
   */
  async deleteCity(id: number) {
    let res = await this.count({ id: id })
    if (!res) {
      return this.errorInfo.unexist('该编号')
    }
    return await this.delete({ id: id })
  }

  /**
   * 城市详情
   */
  async cityDetail(id: number) {
    let res = await this.count({ id: id })
    if (!res) {
      return this.errorInfo.unexist('该编号')
    }
    return await this.get({
      where: {
        id: id
      }
    })
  }

  /**
   * 城市列表
   * @param {Number} data.page_index 页码索引
   * @param {Number} data.page_size  每页显示记录数
   */
  async cityList(data: CityModel) {
    let options: any = {
      where: {
      },
      order: [['created_time', 'DESC']]
    }
    data.page_index && (options.page_index = data.page_index)
    data.page_size && (options.page_size = data.page_size)
    // data.name && (options.where.name = { [this.Op.like]: '%' + data.name + '%' })
    return await this.select(options)
  }

  /**
   * 全部城市列表
   */
  async cityAll() {
    return await this.findAll({
      where: {
      },
      order: [['created_time', 'DESC']]
    })
  }
}