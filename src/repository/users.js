const { User } = require("../../model")

class UsersRepository {
  constructor() {
    this.model = User
  }

  async findById(id) {
    const result = await this.model.findOne({ _id: id })
    return result
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email })
    return result
  }

  async create(body) {
    const user = new this.model(body)
    return user.save()
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token })
  }

  async getCurrentUser(id) {
    const result = await this.model.findOne(
      { _id: id },
      "_id name email subscription avatarURL createdAt"
    )
    return result
  }

  async updateAvatar(id, avatarURL) {
    await this.model.updateOne({ _id: id }, { avatarURL })
  }

  async getAvatar(id) {
    const avatarURL = await this.model.findOne({ _id: id })
    return avatarURL
  }

  async findByField(verifyToken) {
    const result = await this.model.findOne({ verifyToken })
    return result
  }
}

module.exports = UsersRepository
