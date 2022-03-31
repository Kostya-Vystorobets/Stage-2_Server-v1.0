const express = require('express')
const controller = require('../controllers/employee')
const router = express.Router()

router.get('/:id', controller.getById)
router.delete('/:id/department/:departmentId', controller.deleteById)
router.post('/department/:departmentId', controller.create)
router.patch('/:id', controller.updeteById)

module.exports = router