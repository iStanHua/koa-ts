/**
 * 城市
 * @param {Number} ID   ID
 * @param {String} Name   Name
 * @param {String} CountryCode   CountryCode
 * @param {String} District   District
 * @param {Number} Population   Population
 */
export interface CityModel {
  ID?: number,
  Name?: string,
  CountryCode?: string,
  District?: string,
  Number?: number,
  page_index?: string,
  page_size?: string
}