const { Contact } = require("../../model")

class ContactsRepository {
  constructor() {
    this.model = Contact
  }
  async listContacts(userId, { page = 1, limit = 20 }) {
    const result = await this.model.paginate(
      { owner: userId },
      {
        page,
        limit,
        populate: { path: "owner", select: "email subscription -_id" },
      }
    )
    return result
  }
  async getContactById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: "owner",
        select: "email subscription -_id",
      })
    return result
  }
  async create(userId, body) {
    const result = await this.model.create({ ...body, owner: userId })
    return result
  }
  async removeContact(userId, id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    })
    return result
  }

  async updateContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    )

    return result
  }

  async updateStatusContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    )

    return result
  }
}

module.exports = ContactsRepository
