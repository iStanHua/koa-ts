'use strict'

export default {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 123456,
      database: 'world'
    },
    debug: true
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 123456,
      database: 'world'
    },
  }
}