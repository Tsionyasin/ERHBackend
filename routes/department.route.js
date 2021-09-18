const express = require('express');
const departmentController = require('../controllers/department.controller');
const authJwt = require('../middlewares/authJwt')
const router = express.Router();

router.route('/department-list').get(departmentController.GetDepartment);
router.route('/add-department').post(departmentController.addDepartment);
router.route('/department/:id').get(departmentController.GetDepartmentById);


module.exports = router;