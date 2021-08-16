const jimp = require("jimp")
const fs = require("fs/promises")
const path = require("path")
require("dotenv").config()

const TEMP_DIR = process.env.TEMP_DIR

const saveAvatars = async (file) => {
  try {
    const img = await jimp.read(file.path)
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path)
  } catch (error) {
    await fs.unlink(TEMP_DIR)
  }
}
module.exports = saveAvatars
