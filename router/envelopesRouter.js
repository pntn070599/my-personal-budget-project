const express = require("express");
const router = express.Router();

const envelopesController = require("../controller/envelopesController");

/**
 * @swagger
 * /api/envelopes:
 *    get:
 *      summary: Get all envelopes
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      responses:
 *        "200":
 *          description: Returns a list of all envelopes
 *
 */
router.get("/", envelopesController.getEnvelopes);

/**
 * @swagger
 * /api/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Envelope deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Envelope not found
 */
router.delete("/:id", envelopesController.deleteEnvelopes);

/**
 * @swagger
 * /api/envelopes:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Scuba lessons
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
router.post("/", envelopesController.generateEnvelope);

/**
 * @swagger
 * /api/envelopes/id/{id}:
 *    get:
 *      summary: Get an envelope by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.get("/id/:id", envelopesController.findById);

/**
 * @swagger
 * /api/envelopes/title/{title}:
 *    get:
 *      summary: Get an envelope by Title
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.get("/title/:title", envelopesController.findByTitle);

/**
 * @swagger
 * /api/envelopes/budget/{budget}:
 *    get:
 *      summary: Get an envelope by Budget
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.get("/budget/:budget", envelopesController.findByBudget);

/**
 * @swagger
 * /api/envelopes/transfer:
 *    post:
 *      summary: Transfer envelop 1 to envelop 2
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                item1:
 *                  type: integer
 *                item2:
 *                  type: integer
 *                budget:
 *                  type: integer
 *              example:
 *                item1: 1
 *                item2: 2
 *                budget: 30
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
router.post("/transfer", envelopesController.transfer);

module.exports = router;
