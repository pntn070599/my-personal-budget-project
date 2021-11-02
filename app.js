const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("/api/envelopes", require("./router/envelopesRouter"));
const PORT = process.env.PORT || 3070;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
