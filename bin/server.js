const app = require("../app")
const db = require("../src/db")
const path = require("path")
const fs = require("fs").promises
const createFolderIsNotExist = require("../src/helpers/createFolder")
require("dotenv").config()

const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATAR_FOR_USER = process.env.AVATAR_FOR_USER
const TEMP_DIR = process.env.TEMP_DIR
const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR)
    await createFolderIsNotExist(`${UPLOAD_DIR}/${AVATAR_FOR_USER}`)
    await createFolderIsNotExist(TEMP_DIR)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log(`Server not running. Error message: ${error.message}`)
})
