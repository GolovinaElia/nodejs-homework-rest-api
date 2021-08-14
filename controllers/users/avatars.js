const { UserService } = require("../../src/services")
const { saveAvatar } = require("../../src/services/")
const { HttpCode } = require("../../src/helpers/constants")
const serviceUser = new UserService()
const fs = require("fs/promises")
const path = require("path")
require("dotenv").config()

const UPLOAD_DIR = process.env.UPLOAD_DIR

const avatars = async (req, res, next) => {
  const id = req.user.id
  const pathFile = req.file.path
  const { file } = req
  try {
    avatar = await saveAvatar(req.file)
    await fs.rename(
      file.path,
      path.join(UPLOAD_DIR, `${Date.now()}-${file.originalname}`)
    )
    const url = await serviceUser.updateAvatar(id, pathFile)
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      avatarURL: url,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = avatars
