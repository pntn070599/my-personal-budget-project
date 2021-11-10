const { db } = require("../config/dbSetup");

const transactionsController = {
  async getTransactions(req = null, res = null, next = null) {
    const query = `SELECT * FROM transactions;`;
    const result = await db.query(query);
    if (res !== null) return res.status(200).send(result.rows);

    return result.rows;
  },

  async getTransactionByIdHandler(id) {
    console.log("hehe");
    const query = `SELECT * FROM transactions WHERE id = ${id};`;
    const result = await db.query(query);

    return result;
  },

  async insertTransaction(req, res, next) {
    const { description, payment_amount, payment_recipient, envelope_id } =
      req.body;

    let query = `SELECT MAX(id) FROM transactions;`;
    const max = await db.query(query);
    let maxId = 0;
    max.rowCount > 0 ? (maxId = max.rows[0].max + 1) : (maxId = 1);

    query = `INSERT INTO transactions (id, date, description, payment_amount, payment_recipient, envelope_id)
            VALUES (${maxId}, '${new Date().getDay()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}', '${description}', ${payment_amount}, '${payment_recipient}', ${envelope_id});
            `;

    console.log(query);
    const result = await db.query(query);
    result.rowCount === 0
      ? res
          .status(204)
          .send({ status: "failed", message: "something went wrong" })
      : res.status(200).send({
          status: "ok",
          message: "transaction was successfully added",
        });
  },

  async updateTransaction(req, res, next) {
    const {
      id,
      description,
      date,
      payment_amount,
      payment_recipient,
      envelope_id,
    } = req.body;

    const query = `UPDATE transactions SET 
                    date = '${date}', 
                    description = '${description}', 
                    payment_amount = ${payment_amount}, 
                    payment_recipient = '${payment_recipient}',
                    envelope_id = ${envelope_id}
                  WHERE id = ${id};`;
    console.log(query);
    const result = await db.query(query);

    if (result.rowCount === 0)
      return res
        .status(204)
        .send({ status: "failed", message: "transaction not found" });

    res
      .status(200)
      .send({ status: "ok", message: "Update transaction successfully" });
  },

  async getTransactionById(req, res, next) {
    try {
      console.log("hehe");
      const query = `SELECT * FROM transactions WHERE id = ${req.params.id};`;
      const result = await db.query(query);
      console.log("vai", result);
      if (result.rowCount === 0)
        return res
          .status(204)
          .send({ status: false, message: "Transaction not found" });

      res.status(200).send({
        status: true,
        message: "Transaction is found",
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(204).send({ status: false, error: error });
    }
  },

  async deleteTransactionById(req, res, next) {
    const query = `DELETE FROM transactions WHERE id = ${req.params.id}`;
    const result = await db.query(query);
    result.rowCount === 0
      ? res
          .status(204)
          .send({ status: "failed", message: "Transaction is not found" })
      : res.status(200).send({
          status: "ok",
          message: "Transaction was successfully deleted",
        });
  },
};

module.exports = transactionsController;
