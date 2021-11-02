const dbHelper = require("../handlers/helper");
const db = require("../config/db");

const envelopesController = {
  async getEnvelopes(req, res, next) {
    try {
      const allEnvelopes = await db;
      res.status(200).send(allEnvelopes);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async deleteEnvelopes(req, res) {
    try {
      const allEnvelopes = await db;
      const index = dbHelper.findById(allEnvelopes, req.params.id);
      if (!index)
        return res.status(404).send({ message: "Envelope not found" });

      const data = dbHelper.deleteById(allEnvelopes, index.id);
      dbHelper.writeDB(data);
      //   db = data;
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async generateEnvelope(req, res) {
    try {
      const allEnvelopes = await db;
      const index = dbHelper.findByTitle(allEnvelopes, req.body.title);
      if (index !== null)
        return res
          .status(404)
          .send({ message: "This envelope is already exists." });

      const newEnvelopes = dbHelper.generate(allEnvelopes, req.body);
      dbHelper.writeDB(newEnvelopes);
      res.status(200).send(newEnvelopes);
    } catch (error) {
      req.status(404).send(error);
    }
  },

  async findById(req, res) {
    try {
      const allEnvelopes = await db;
      const result = dbHelper.findById(allEnvelopes, req.params.id);
      if (!result)
        return res.status(200).send({ message: "envelope not found" });

      return res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  async findByTitle(req, res) {
    try {
      const allEnvelopes = await db;
      const result = dbHelper.findByTitle(allEnvelopes, req.params.title);
      if (!result)
        return res.status(200).send({ message: "envelope not found" });

      return res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  async findByBudget(req, res) {
    try {
      const allEnvelopes = await db;
      const result = dbHelper.findByBudget(allEnvelopes, req.params.budget);
      if (!result)
        return res.status(200).send({ message: "envelope not found" });

      return res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  async transfer(req, res) {
    try {
      const allEnvelopes = await db;
      const { item1, item2, budget } = req.body;
      const result = dbHelper.transfer(allEnvelopes, item1, item2, budget);

      if (result.status === false) return res.status(200).send(result);

      dbHelper.writeDB(result.items);

      res.status(200).send(result);
    } catch (error) {
      res.status(404).send(error);
    }
  },
};

module.exports = envelopesController;
