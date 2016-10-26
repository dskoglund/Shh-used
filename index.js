const express = require('express')
const createApp = require('./shop-app')
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/shoes'
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI

const PORT = process.env.PORT || 3000

MongoClient.connect(MONGODB_URI, (err, db) => {

  if(err) {
    console.error(err)
    process.exit(1)
  }

  const app = createApp(db)

  app.listen(PORT, () => {
    NODE_ENV !== 'production' &&
    console.log('listening......on '+ PORT)
  })
})
