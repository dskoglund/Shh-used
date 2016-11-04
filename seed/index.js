const data = require('./data.json')
const MongoClient = require('mongodb').MongoClient

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/shoes'
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const shoes = db.collection('shoes')

  shoes.find().toArray((err, docs) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    if (docs.length > 0 ) {
      return db.close()
    } else {
      shoes.insertMany(data, (err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        } else {
          db.close()
        }
      })
    }
  })

})
