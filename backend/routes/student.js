const express = require('express')
const router = express.Router();
const studentController = require('../controllers/student')
const passport = require("passport");

const auth = passport.authenticate("jwt-authentication",{session: false});

router.get('/', studentController.getAllStudent)
router.get('/:id',studentController.getStudentById)
router.post('/',studentController.createNewStudent)
router.put('/:id',studentController.editStudentById)
router.delete('/:id',auth,studentController.deleteStudentById) //part นี้ใส่ auth for login postman include





module.exports = router;