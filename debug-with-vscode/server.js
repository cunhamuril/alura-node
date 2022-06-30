const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const value = req.query.externalData;
  const responseValue = `You send me ${value}`;

  res.send(responseValue);
});

const port = 3000;
app.listen(port, () => {
  console.log(`
    🚀 Server running successfully
    http://localhost:${port}
  `);
});
