const express = require('express')
const controller = require('../controllers/department')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)
router.post('/', controller.create)
router.patch('/:id', controller.updeteById)

module.exports = router