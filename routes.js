const Router = require('express').Router
const assert = require('assert')

const appRouter = function(db) {
  const shoe = db.collection('shoe')
  const router = new Router()

  router.get('/', (req, res) => {
    shoe.find().toArray((err, docs) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(docs)
    })
  })

  router.post('/', (req, res) => {
    shoe.insertOne(req.body, (err, result) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(result.ops[0])
    })
  })

  router.delete('/:_id', (req, res) => {
    shoe.deleteOne({ "task": req.params.task }, (err, result) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(result)
    })
  })

  router.put('/shoe/:shoeId', (req, res) => {
    shoe.updateOne({ "name": req.params.name }, { $set: req.body }, (err, result) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(result)
    })
  })

  return router
}

module.exports = appRouter;
