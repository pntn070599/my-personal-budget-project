const fs = require("fs");
const { db } = require("../config/dbSetup");
module.exports = {
  async findById(id) {
    const query = `SELECT * FROM envelope WHERE id = '${id}';`;
    let result = await db.query(query);
    console.log(result.rowCount);
    if (result.rowCount === 0) return null;

    return result.rows;
  },

  async findByTitle(title) {
    const query = `SELECT * FROM envelope WHERE title = '${title}';`;
    let result = await db.query(query);
    console.log(result.rowCount);
    if (result.rowCount === 0) return null;

    return result.rows;
  },

  async getAllEnvelopes() {
    const query = "SELECT * FROM envelope;";
    const allEnvelopes = await db.query(query);
    return allEnvelopes.rows;
  },

  deleteById(items, id) {
    const index = items.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      console.log("Id not found!");
      return items;
    }

    items.splice(index, 1);

    return items;
  },

  async generate() {
    try {
      const query = `SELECT MAX(id) FROM envelope;`;
      const id = await db.query(query);
      if (id.rowCount === 0)
        return { status: false, message: "something went wrong" };
      console.log(id.rows);
      return id.rows;
    } catch (error) {
      console.log(error);
      return { status: false, message: "something went wrong" };
    }
  },

  async findByBudget(budget) {
    const query = `SELECT * FROM envelope WHERE budget = '${budget}';`;
    let result = await db.query(query);
    console.log(result.rowCount);
    if (result.rowCount === 0) return null;

    return result.rows;
  },

  /**
   * @function transfer
   * @param {array<object>} items - db.
   * @param {object} item1 - item want to send.
   * @param {object} item2 - item want to receive.
   * @param {number} budget - how much want to send?
   * @return {array<object>}
   */
  async transfer(items, item1, item2, budget) {
    const index1 = items.findIndex((item) => item.id === item1);
    const index2 = items.findIndex((item) => item.id === item2);
    if (index1 === -1 || index2 === -1)
      return {
        status: false,
        message: "failed to transfer",
        error: "item not found!",
      };

    if (index1 === index2)
      return {
        status: false,
        message: "failed to transfer",
        error: "Can not transfer itself",
      };

    if (items[index1].budget < budget)
      return {
        status: false,
        message: "failed to transfer",
        error: "Budget is not enough to transfer",
      };

    // if (items[index2].budget < budget)

    items[index1].budget -= budget;
    await this.updateBudget(items[index1]);
    items[index2].budget += budget;
    await this.updateBudget(items[index2]);

    return { status: true, items: items, message: "transfer success" };
  },

  async updateBudget(item) {
    try {
      const query = `UPDATE envelope SET budget = ${item.budget} WHERE id = ${item.id}`;
      const result = await db.query(query);
      if (result.rowCount === 0)
        return { status: false, message: "Something went wrong" };

      return {
        status: true,
        message: "Insert envelop succeed",
        data: item,
      };
    } catch (error) {
      console.log(error);
      return { status: false, message: "Something went wrong" };
    }
  },

  async writeDB(item) {
    try {
      const query = `INSERT INTO envelope VALUES (${item.id}, '${item.title}', ${item.budget});`;
      const result = await db.query(query);
      if (result.rowCount === 0)
        return { status: false, message: "Something went wrong" };

      return {
        status: true,
        message: "Insert envelop succeed",
        data: item,
      };
    } catch (error) {
      console.log(error);
      return { status: false, message: "Something went wrong" };
    }
  },
};
