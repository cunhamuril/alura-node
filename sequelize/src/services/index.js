const database = require("../db/models");

class Services {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async getAllRecords(where = {}, config = {}) {
    return database[this.modelName].findAll({ where: { ...where }, ...config });
  }

  async getOneRecord(id = 0, config = {}) {
    return database[this.modelName].findOne({ where: { id }, ...config });
  }

  async createRecord(data = {}) {
    return database[this.modelName].create(data);
  }

  async updateRecord(id = 0, data = {}, config = {}) {
    const requestedRecord = await database[this.modelName].findOne(
      { where: { id } },
      { ...config }
    );

    if (!requestedRecord) {
      throw new Error(`${this.modelName} not found.`);
    }

    return await database[this.modelName].update(data, {
      where: { id },
    });
  }

  async updateRecords(where = {}, data = {}, config = {}) {
    const requestedRecord = await database[this.modelName].findOne(
      { where: { ...where } },
      { ...config }
    );

    if (!requestedRecord) {
      throw new Error(`${this.modelName} not found.`);
    }

    return await database[this.modelName].update(data, {
      where: { id },
    });
  }

  async deleteRecord(id = 0) {
    const requestedRecord = await database[this.modelName].findOne({
      where: { id },
    });

    if (!requestedRecord) {
      throw new Error(`${this.modelName} not found.`);
    }

    await database[this.modelName].destroy({
      where: { id },
    });
  }

  async restoreRecord(id = 0) {
    return database[this.modelName].restore({ where: { id } });
  }
}

module.exports = Services;
