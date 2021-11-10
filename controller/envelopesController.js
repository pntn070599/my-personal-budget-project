const dbHelper = require("../handlers/helper");
const { db } = require("../config/dbSetup.js");

const envelopesController = {
  async getEnvelopes(req, res, next) {
    try {
      const allEnvelopes = await dbHelper.getAllEnvelopes();
      console.log(allEnvelopes);
      res.status(200).send(allEnvelopes);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteEnvelopes(req, res) {
    try {
      // const allEnvelopes = await db;
      // const index = dbHelper.findById(allEnvelopes, req.params.id);
      // if (!index)
      //   return res.status(404).send({ message: "Envelope not found" });

      const query = `DELETE FROM envelope WHERE id = ${req.params.id}`;

      let result = await db.query(query);

      // const data = dbHelper.deleteById(allEnvelopes, index.id);
      // dbHelper.writeDB(data);
      //   db = data;
      if (result.rowCount > 0)
        return res.status(200).send({ message: "deleted" });

      res.status(200).send({ message: "envelope not found" });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async generateEnvelope(req, res) {
    console.log(req.body.title);
    try {
      const index = await dbHelper.findByTitle(req.body.title);
      console.log(index);
      if (index !== null)
        return res
          .status(404)
          .send({ message: "This envelope is already exists." });

      const allEnvelopes = await dbHelper.getAllEnvelopes();
      const re = await dbHelper.generate(allEnvelopes, req.body);
      const id = re[0].max + 1;
      const newEnvelopes = {
        id: id,
        title: req.body.title,
        budget: req.body.budget,
      };
      const result = await dbHelper.writeDB(newEnvelopes);
      if (result.status === false) return res.status(200).send(result);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },

  async findById(req, res) {
    try {
      const result = await dbHelper.findById(req.params.id);
      if (result === null)
        return res.status(200).send({ message: "envelope not found" });

      return res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  async findByTitle(req, res) {
    try {
      const result = await dbHelper.findByTitle(req.params.title);
      if (result === null)
        return res.status(200).send({ message: "envelope not found" });

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },

  async findByBudget(req, res) {
    try {
      const result = await dbHelper.findByBudget(req.params.budget);
      if (result === null)
        return res.status(200).send({ message: "envelope not found" });

      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },

  async transfer(req, res) {
    try {
      const allEnvelopes = await dbHelper.getAllEnvelopes();
      const { item1, item2, budget } = req.body;
      const result = await dbHelper.transfer(
        allEnvelopes,
        item1,
        item2,
        budget
      );

      if (result.status === false) return res.status(200).send(result);
      console.log(result);
      // dbHelper.writeDB(result.items);

      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },
};

module.exports = envelopesController;
