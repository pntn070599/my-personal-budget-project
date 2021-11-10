const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const { setup } = require("./config/dbSetup");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(logger("dev"));
app.use(express.json());
setup();
app.use("/api/envelopes", require("./router/envelopesRouter"));
app.use("/api/transactions", require("./router/transactionsRouter"));
app.use("/api-docs", require("./router/docs"));
const PORT = process.env.PORT || 3070;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
