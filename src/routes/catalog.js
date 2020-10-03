const express = require('express')
const controller = require('../controllers/catalog')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
