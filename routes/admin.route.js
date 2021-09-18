const express = require('express');
const adminContoller = require('../controllers/admin.controller');
const authJwt = require('../middlewares/authJwt')
const router = express.Router();

router.route('/profiles').get(adminContoller.getAdminProfile);
router.get('/total-user', [authJwt.verifyToken, authJwt.checkIfUserIsAdmin], adminContoller.countUser);
router.route('/total-approver/:id').get(adminContoller.countApprover);
router.route('/total-post').get(adminContoller.countPost);
router.post('/add-profile/:username', [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],adminContoller.createInstituteDetail)
router.route('/user-list').get(adminContoller.getUser);
router.route('/approver-list').get(adminContoller.getApprover);
router.post('/register-user', [authJwt.verifyToken, authJwt.checkIfUserIsAdmin], adminContoller.createUser);
router.post('/register-approver/:department', adminContoller.createApprover);
router.post('/register-externaluser/:name',[authJwt.verifyToken, authJwt.checkIfUserIsAdmin], adminContoller.AddExternal);
router.post('/add-department', [authJwt.verifyToken, authJwt.checkIfUserIsAdmin] ,adminContoller.addDepartment);
router.get('/department-list', [authJwt.verifyToken, authJwt.checkIfUserIsAdmin] ,adminContoller.GetDepartment);


router.get('/:_id', adminContoller.getUserById);
router.put('/update/:id',adminContoller.updateUser);
router.put('/updateProfile/:id', adminContoller.updateProfile);
router.delete('/delete-user/:id', adminContoller.deleteUser);
router.delete('/delete/:id',adminContoller.deleteProfile);
router.route('/External-list').get(adminContoller.GetExternalUser);
router.route('/logout').get(adminContoller.Logout);


// router.get('/AdminList', adminContoller.AdminList);


module.exports = router;