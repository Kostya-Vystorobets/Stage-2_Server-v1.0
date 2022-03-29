const express = require('express')
const controller = require('../controllers/employee')
const router = express.Router()

router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)
router.post('/department/id', controller.create)
router.patch('/:id', controller.updeteById)

module.exports = router