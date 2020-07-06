const express = require("express");
const users = require("./user.controller")
const router = express.Router();
const {authenticate, authorize} = require("../../../../middlewares/auth");
const {uploadImages} = require("../../../../middlewares/uploadImages")

const {validatePostUser} = require("../../../../middlewares/validation/users/postUser")

router.post("", validatePostUser,  users.createUser);
router.post("/login", users.login);
router.patch(
    "/upload-avatar", 
    authenticate,
    uploadImages("avatar"),
    users.uploadAvatar
    )

module.exports = router;