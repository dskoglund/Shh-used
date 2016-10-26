const Router = require('express').Router
const assert = require('assert')

const appRouter = function(db) {
  const shoes = db.collection('shoes')
  const router = new Router()

  router.get('/', (req, res) => {
    shoes.find().toArray((err, docs) => {
      if(err) return next(err)
      res.json(docs)
    })
  })

  return router
}

module.exports = appRouter;
