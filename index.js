const express = require('express')
const createApp = require('./shop-app')
const mongodb = require('mongodb')

const MONGO_URI = 'mongodb://localhost:27017/shoes'
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(MONGO_URI, (err, db) => {
  if(err) {
    console.error(err)
    process.exit(1)
  }

  const app = createApp(db)


  app.listen(3060, () => {
  console.log('listening......on 3060.')
  })
})
