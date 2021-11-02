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
        return res.status(404).send({ message: "Envelopes not found" });

      const data = dbHelper.deleteById(allEnvelopes, index.id);
      dbHelper.writeDB(data);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = envelopesController;
