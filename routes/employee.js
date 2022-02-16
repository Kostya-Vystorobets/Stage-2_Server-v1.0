const controller = require('../controllers/employee')
const express = require('express')
const router = express.Router()

router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)
router.post('/', controller.create)
router.patch('/:id', controller.updeteById)

module.exports = router