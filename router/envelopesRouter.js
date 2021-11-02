const express = require("express");
const router = express.Router();

const envelopesController = require("../controller/envelopesController");

/**
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
 * /api/v1/envelopes/{id}:
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
 *        "200":
 *          description: Envelope deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Envelope not found
 */
router.delete("/:id", envelopesController.deleteEnvelopes);

router.post("/", envelopesController.generateEnvelope);

router.get("/id/:id", envelopesController.findById);

router.get("/title/:title", envelopesController.findByTitle);

router.get("/budget/:budget", envelopesController.findByBudget);

router.post("/transfer", envelopesController.transfer);

module.exports = router;
