const fs = require("fs");

module.exports = {
  findById(items, id) {
    const result = items.find((item) => item.id === parseInt(id));

    if (!result) console.log("Id not found!");

    return result;
  },

  findByTitle(items, title) {
    console.log(title);
    const result = items.find((item) => item.title === title);
    console.log(result);
    if (!result) return null;

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

  generate(items, input) {
    items.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
    });

    let newItem = {
      id: items[items.length - 1].id + 1,
      title: input.title,
      budget: parseInt(input.budget),
    };

    items.push(newItem);
    return items;
  },

  findByBudget(items, budget) {
    const result = items.find((item) => item.budget === parseInt(budget));

    if (!result) console.log(`Item with budget: ${budget} not found`);

    return result;
  },

  /**
   * @function transfer
   * @param {array<object>} items - db.
   * @param {object} item1 - item want to send.
   * @param {object} item2 - item want to receive.
   * @param {number} budget - how much want to send?
   * @return {array<object>}
   */
  transfer(items, item1, item2, budget) {
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

    if (item1.budget < budget)
      return {
        status: false,
        message: "failed to transfer",
        error: "Budget is not enough to transfer",
      };

    items[index1].budget -= budget;
    items[index2].budget += budget;

    return { status: true, items: items, message: "transfer success" };
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
