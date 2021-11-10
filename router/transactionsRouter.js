const express = require("express");
const router = express.Router();

const transactionsController = require("../controller/transactionsController");

/**
 * @swagger
 * /api/transactions:
 *    get:
 *      summary: Get all transactions
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      responses:
 *        "200":
 *          description: Returns a list of all transactions
 *
 */
router.get("/", transactionsController.getTransactions);

/**
 * @swagger
 * /api/transactions/{id}:
 *    get:
 *      summary: Get a transaction by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: transaction id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Transaction not found
 *        "500":
 *          description: Internal server error
 */
router.get("/:id", transactionsController.getTransactionById);

/**
 * @swagger
 * /api/transactions/{id}:
 *    delete:
 *      summary: Deletes an individual transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Transaction ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Transaction deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Transaction not found
 */
router.delete("/:id", transactionsController.deleteTransactionById);

/**
 * @swagger
 * /api/transactions/:
 *    put:
 *      summary: Updates an existing transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                description:
 *                  type: string
 *                date:
 *                  type: string
 *                payment_amount:
 *                  type: integer
 *                payment_recipient:
 *                  type: string
 *                envelope_id:
 *                  type: integer
 *              example:
 *                id: 1
 *                description: updated
 *                date: 2021-11-02T17:00:00.000Z
 *                payment_amount: 20
 *                payment_recipient: Pizza
 *                envelope_id: 2
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.put("/", transactionsController.updateTransaction);

/**
 * @swagger
 * /api/transactions:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  description:
 *                      type: string
 *                  payment_amount:
 *                      type: integer
 *                  payment_recipient:
 *                      type: string
 *                  envelope_id:
 *                      type: integer
 *              example:
 *                description: Scuba lessons
 *                payment_amount: 300
 *                payment_recipient: Scuba lessons
 *                envelope_id: 1
 *      responses:
 *        "200":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
router.post("/", transactionsController.insertTransaction);

module.exports = router;
