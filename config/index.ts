'use strict'

import knexfile from './knexfile'

export default {
  db: (knexfile as any)[process.env.NODE_ENV || 'development'],
  server: {
    port: 8080,
    host: 'localhost'
  }
}