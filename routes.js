const Router = require('express').Router
const assert = require('assert')

const appRouter = function(db) {
  const shoes = db.collection('shoes')
  const router = new Router()
  const cart = db.collection('cart')

  router.get('/', (req, res) => {
    shoes.find().toArray((err, docs) => {
      if(err) return next(err)
      res.json(docs)
    })
  })

  router.post('/', (req, res) => {
    cart.insertOne(req.body, (err, result) => {
      if (err) return res.sendStatus(500)
      const doc = result.ops[0]
      res.json(doc)
    })
  })
  return router
}

module.exports = appRouter;
