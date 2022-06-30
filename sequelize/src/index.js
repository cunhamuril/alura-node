const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running in port ${port}`);
});
