const express = require('express')
const appRouter = require('./routes.js')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

function createApp(db) {

  const app = express()

  app.use(jsonParser)
  app.use(express.static('./public'))
  app.use(express.static('./templates'))
  app.use('/shoes', appRouter(db))

  return app

}

module.exports = createApp
