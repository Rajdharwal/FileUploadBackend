const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload}  = require("../cotrollers/FileUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);

module.exports = router;