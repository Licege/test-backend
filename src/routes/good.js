const express = require('express')
const controller = require('../controllers/good')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.get)
router.get('/available_title/:title', controller.availableTitle)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router
