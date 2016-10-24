const Router = require('express').Router
const assert = require('assert')

const appRouter = function(db) {
  const shoes = db.collection('shoes')
  const router = new Router()

  router.get('/shoes', (req, res) => {
    shoes.find().toArray((err, docs) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(docs)
    })
  })

  router.post('/', (req, res) => {
    shoes.insertOne(req.body, (err, result) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(result.ops[0])
    })
  })

  router.delete('/:_id', (req, res) => {
    shoes.deleteOne({ "task": req.params.task }, (err, result) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(result)
    })
  })

  router.put('/shoe/:shoeId', (req, res) => {
    shoes.updateOne({ "name": req.params.name }, { $set: req.body }, (err, result) => {
      if(err) {
        return res.sendStatus(500)
      }
      res.json(result)
    })
  })

  return router
}

module.exports = appRouter;
