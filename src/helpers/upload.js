const path = require("path")
require("dotenv").config()
const multer = require("multer")
const ErrorHandler = require("./errorHandler")
const { HttpCode } = require("./constants")

const TEMP_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true)
    }

    cb(new ErrorHandler(HttpCode.BAD_REQUEST, "Wrong format file for avatar"))
  },
})

module.exports = upload
