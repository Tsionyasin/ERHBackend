const express = require('express');

const approverController = require('../controllers/approver.controller');
const router = express.Router();

router.get("/profiles", approverController.getApproverProfile)
router.post("/:username/add-profile/", approverController.createApproverProfile);





module.exports = router;