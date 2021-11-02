const fs = require("fs");

module.exports = {
  findById(items, id) {
    const result = items.find((item) => item.id === parseInt(id));

    if (!result) console.log("Id not found!");

    return result;
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

  async writeDB(items) {
    try {
      await fs.writeFileSync(
        __dirname + "/../config/db.json",
        JSON.stringify(items)
      );
      console.log("done writing db");
    } catch (error) {
      console.error(error);
    }
  },
};
