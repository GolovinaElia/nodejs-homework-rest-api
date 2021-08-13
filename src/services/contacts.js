const { ContactsRepository } = require("../repository")

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    }
  }
  async listContacts(userId, query) {
    const data = await this.repositories.contacts.listContacts(userId, query)
    const { docs: contacts, totalDocs: total, totalPages, page } = data
    return { contacts, total, totalPages, page }
  }
  async getContactById(userId, id) {
    const data = await this.repositories.contacts.getContactById(userId, id)
    return data
  }
  async create(userId, body) {
    const data = await this.repositories.contacts.create(userId, body)
    return data
  }
  async removeContact(userId, id) {
    const data = await this.repositories.contacts.removeContact(userId, id)
    return data
  }
  async updateContact(userId, id, body) {
    const data = await this.repositories.contacts.updateContact(
      userId,
      id,
      body
    )
    return data
  }

  async updateStatusContact(userId, id, body) {
    const data = await this.repositories.contacts.updateStatusContact(
      userId,
      id,
      body
    )
    return data
  }
}

module.exports = new ContactsService()
